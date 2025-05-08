import React, { useState } from 'react';
import { FormData, UTMParams } from '../types';
import { trackLeadSubmission } from '../utils/analytics';
import { getStoredUTMParams } from '../utils/utmParams';

interface LeadFormProps {
  zapierWebhookUrl: string;
}

const LeadForm: React.FC<LeadFormProps> = ({ zapierWebhookUrl }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    interest: '',
  });
  
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [validation, setValidation] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear validation error when field is edited
    if (validation[name]) {
      setValidation((prev) => ({
        ...prev,
        [name]: '',
      }));
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
    
    if (!formData.interest) {
      errors.interest = 'Please select your interest';
    }
    
    setValidation(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset states
    setError(null);
    setSuccess(false);
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    // Get UTM parameters from session storage
    const utmParams = getStoredUTMParams();
    
    // Prepare data for submission
    const submissionData = {
      ...formData,
      ...utmParams,
      submission_date: new Date().toISOString(),
    };
    
    setSubmitting(true);
    
    try {
      // Send data to Zapier webhook
      const response = await fetch(zapierWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });
      
      if (!response.ok) {
        throw new Error(`Submission failed: ${response.statusText}`);
      }
      
      // Track event in GA4
      trackLeadSubmission({
        name: formData.name,
        email: formData.email,
        interest: formData.interest,
        ...utmParams,
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        interest: '',
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
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Get Started Today</h2>
      
      {success ? (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4 flex items-start">
          <svg className="w-5 h-5 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="font-medium">Thank you for your interest!</p>
            <p className="text-sm">We've received your information and will be in touch soon.</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
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
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                validation.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your name"
            />
            {validation.name && (
              <p className="mt-1 text-sm text-red-600">{validation.name}</p>
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
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                validation.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="your@email.com"
            />
            {validation.email && (
              <p className="mt-1 text-sm text-red-600">{validation.email}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-1">
              What are you interested in?
            </label>
            <select
              id="interest"
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors bg-white ${
                validation.interest ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select an option</option>
              <option value="product">Product Information</option>
              <option value="demo">Request a Demo</option>
              <option value="pricing">Pricing Details</option>
              <option value="partnership">Partnership Opportunities</option>
            </select>
            {validation.interest && (
              <p className="mt-1 text-sm text-red-600">{validation.interest}</p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              submitting ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {submitting ? 'Submitting...' : 'Sign Up Now'}
          </button>
          
          <p className="text-xs text-gray-500 mt-4">
            By submitting this form, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </a>
            .
          </p>
        </form>
      )}
    </div>
  );
};

export default LeadForm;