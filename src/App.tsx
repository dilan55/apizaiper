import React, { useEffect } from 'react';
import NewsletterForm from './components/NewsletterForm';
import QuoteWidget from './components/QuoteWidget';
import { initializeGA } from './utils/analytics';
import { storeUTMParams } from './utils/utmParams';
import { GraduationCap } from 'lucide-react';

function App() {
  const GA4_MEASUREMENT_ID = 'G-SXB5Q7MHX0'; // Replace with your GA4 Measurement ID
  const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/22815033/2nmegaj/';

  useEffect(() => {
    initializeGA(GA4_MEASUREMENT_ID);
    storeUTMParams();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
              <GraduationCap size={32} className="text-blue-600" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 px-2">
              Learn Something New Every Day
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 px-2">
              Join our educational newsletter and receive curated content, expert insights,
              and valuable resources directly in your inbox.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-12">
            {[
              {
                title: 'Expert Content',
                description: 'Curated articles and resources from industry experts',
              },
              {
                title: 'Weekly Updates',
                description: 'Stay informed with the latest educational trends',
              },
              {
                title: 'Practical Tips',
                description: 'Actionable advice you can apply immediately',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
            <NewsletterForm zapierWebhookUrl={ZAPIER_WEBHOOK_URL} />
            <div className="bg-white rounded-lg shadow-xl p-4 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
                Daily Inspiration
              </h2>
              <QuoteWidget />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;