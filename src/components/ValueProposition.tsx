import React from 'react';
import { Shield, Zap, BarChart } from 'lucide-react';

const features = [
  {
    icon: <Zap size={24} className="text-blue-500" />,
    title: 'Lightning Fast',
    description:
      'Our streamlined process ensures you get results quickly without sacrificing quality or accuracy.',
  },
  {
    icon: <Shield size={24} className="text-blue-500" />,
    title: 'Secure & Reliable',
    description:
      'Enterprise-grade security with 99.9% uptime guarantee. Your data is always protected and available.',
  },
  {
    icon: <BarChart size={24} className="text-blue-500" />,
    title: 'Advanced Analytics',
    description:
      'Gain valuable insights with our comprehensive analytics dashboard and detailed reporting tools.',
  },
];

const ValueProposition: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Why Choose Our Solution
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide the tools and expertise you need to succeed in today's
            competitive landscape. Our platform is designed with your goals in mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Designed for Real Results
              </h3>
              <p className="text-gray-600 mb-6">
                Our platform isn't just about features—it's about delivering real,
                measurable outcomes for your business. We focus on what matters most:
                helping you achieve your goals efficiently and effectively.
              </p>
              <ul className="space-y-3">
                {[
                  'Increase conversion rates by up to 30%',
                  'Reduce operational costs by 25%',
                  'Save 15+ hours per week on manual processes',
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-blue-600 flex items-center justify-center">
              <div className="p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Join 1,000+ Satisfied Customers
                </h3>
                <p className="text-blue-100 mb-6">
                  Trusted by leading companies across industries
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {['Company A', 'Company B', 'Company C', 'Company D'].map(
                    (company, index) => (
                      <div
                        key={index}
                        className="bg-white/10 p-4 rounded-md text-white font-medium"
                      >
                        {company}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;