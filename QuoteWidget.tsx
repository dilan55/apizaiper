import React, { useEffect, useState } from 'react';
import { Quote } from '../types';
import { RefreshCw } from 'lucide-react';

const QuoteWidget: React.FC = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://api.quotable.io/random');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch quote: ${response.status}`);
      }
      
      const data = await response.json();
      setQuote({
        _id: data._id,
        content: data.content,
        author: data.author,
        tags: data.tags,
        authorSlug: data.authorSlug,
        length: data.length
      });
    } catch (err) {
      setError('Failed to load quote. Please try again.');
      console.error('Error fetching quote:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800">Daily Inspiration</h3>
        <button 
          onClick={fetchQuote}
          className="text-blue-600 hover:text-blue-800 transition-colors flex items-center text-xs sm:text-sm"
          disabled={loading}
          aria-label="Refresh quote"
        >
          <RefreshCw 
            size={14}
            className={`mr-1 ${loading ? 'animate-spin text-gray-400' : ''}`} 
          />
          {loading ? 'Loading...' : 'New Quote'}
        </button>
      </div>
      
      {error ? (
        <div className="text-red-500 py-4 text-center text-sm">{error}</div>
      ) : loading ? (
        <div className="animate-pulse">
          <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded w-1/4 ml-auto"></div>
        </div>
      ) : quote ? (
        <>
          <blockquote className="italic text-gray-700 border-l-4 border-blue-500 pl-4 py-2 mb-2 text-sm sm:text-base">
            "{quote.content}"
          </blockquote>
          <p className="text-right text-gray-600 text-sm">— {quote.author}</p>
        </>
      ) : null}
    </div>
  );
};

export default QuoteWidget