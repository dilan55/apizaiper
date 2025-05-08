import React from 'react';

const Hero: React.FC = () => {
  return (
    <section 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-800 to-indigo-900 text-white pt-16"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-indigo-900/90"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in">
              Transform Your Business with Our Solution
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 max-w-xl mx-auto lg:mx-0">
              Streamline operations, boost productivity, and drive growth with our comprehensive platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="#signup" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Get Started Free
              </a>
              
              <a 
                href="#demo" 
                className="bg-transparent hover:bg-white/10 text-white font-medium py-3 px-6 rounded-md border border-white/30 hover:border-white/50 transition-all duration-300"
              >
                Watch Demo
              </a>
            </div>
            
            <div className="mt-8 text-sm text-blue-200">
              <p>No credit card required · Free 14-day trial · Cancel anytime</p>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-lg shadow-2xl p-4 transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="rounded-md overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
                  alt="Dashboard Preview" 
                  className="w-full h-auto"
                />
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white py-2 px-4 rounded-full shadow-lg">
                New Feature!
              </div>
            </div>
            
            <div className="absolute -bottom-8 -left-8 bg-white p-4 rounded-lg shadow-lg z-20 lg:block hidden">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((_, index) => (
                    <div 
                      key={index} 
                      className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center overflow-hidden"
                    >
                      <span className="text-xs font-medium text-gray-700">
                        {String.fromCharCode(65 + index)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="text-gray-800 text-sm">
                  <strong>1,234+</strong> users joined this month
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-24 text-center">
          <p className="text-blue-200 mb-6">Trusted by innovative companies</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['Brand 1', 'Brand 2', 'Brand 3', 'Brand 4'].map((brand, index) => (
              <div key={index} className="flex items-center justify-center">
                <span className="text-xl font-bold text-white/80">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;