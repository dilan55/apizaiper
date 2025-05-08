import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <span className={`font-bold text-xl ${isScrolled ? 'text-blue-600' : 'text-white'}`}>
              YourBrand
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {['Features', 'Pricing', 'About', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`font-medium transition-colors ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-blue-600' 
                    : 'text-white hover:text-blue-200'
                }`}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <a
            href="#signup"
            className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors shadow-sm"
          >
            Get Started
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden focus:outline-none"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <X size={24} className={isScrolled ? 'text-gray-800' : 'text-white'} />
            ) : (
              <Menu size={24} className={isScrolled ? 'text-gray-800' : 'text-white'} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-3">
              {['Features', 'Pricing', 'About', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="font-medium text-gray-800 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <a
                href="#signup"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors shadow-sm text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;