import React, { useState } from 'react';
import { NewsletterFormData, UTMParams } from '../types';
import { trackNewsletterSignup } from '../utils/analytics';
import { getStoredUTMParams } from '../utils/utmParams';
import { Send } from 'lucide-react';

interface NewsletterFormProps {
  zapierWebhookUrl: string;
}

const NewsletterForm: React.FC<NewsletterFormProps> = ({ zapierWebhookUrl }) => {
  const [formData, setFormData] = useState<NewsletterFormData>({
    name: '',
    age: 18,
    email: '',
  });
  
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [validation, setValidation] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value,
    }));
    
    if (validation[name]) {
      setValidation((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (formData.age < 13) {
      errors.age = 'You must be at least 13 years old';
    }
    
    setValidation(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    
    if (!validateForm()) {
      return;
    }
    
    const utmParams = getStoredUTMParams();
    
    const submissionData = {
      ...formData,
      ...utmParams,
      submission_date: new Date().toISOString(),
    };
    
    setSubmitting(true);
    
    try {
     const response = await fetch(zapierWebhookUrl, {
  method: 'POST',
  body: new URLSearchParams(
    Object.entries(submissionData).reduce((acc, [key, value]) => {
      acc[key] = String(value);
      return acc;
    }, {} as Record<string, string>)
  )
});
      
      if (!response.ok) {
        throw new Error(`Submission failed: ${response.statusText}`);
      }
      
      trackNewsletterSignup({
        ...formData,
        ...utmParams,
      });
      
      setFormData({
        name: '',
        age: 18,
        email: '',
      });
      
      setSuccess(true);
      
    } catch (err) {
      console.error('Form submission error:', err);
      setError('Failed to submit form. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-4 sm:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">Join Our Educational Newsletter</h2>
      
      {success ? (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 sm:px-6 py-4 rounded-lg mb-4">
          <h3 className="font-semibold mb-2">Thank you for subscribing! 🎉</h3>
          <p className="text-sm sm:text-base">Check your inbox for a welcome email with your first educational resources.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                validation.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your name"
            />
            {validation.name && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{validation.name}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              min="13"
              value={formData.age}
              onChange={handleChange}
              className={`w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                validation.age ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {validation.age && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{validation.age}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                validation.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="you@example.com"
            />
            {validation.email && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{validation.email}</p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-all flex items-center justify-center space-x-2 ${
              submitting ? 'opacity-75 cursor-not-allowed' : 'hover:transform hover:-translate-y-0.5'
            }`}
          >
            <Send size={18} className="sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">{submitting ? 'Subscribing...' : 'Subscribe to Newsletter'}</span>
          </button>
          
          <p className="text-xs sm:text-sm text-gray-500 mt-4">
            By subscribing, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
            {' '}and{' '}
            <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>.
            We'll send you educational content and updates.
          </p>
        </form>
      )}
    </div>
  );
}

export default NewsletterForm;