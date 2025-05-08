import { UTMParams } from '../types';

// Extract UTM parameters from URL
export const getUTMParams = (): UTMParams => {
  if (typeof window === 'undefined') return {};
  
  const urlParams = new URLSearchParams(window.location.search);
  
  return {
    utm_source: urlParams.get('utm_source') || undefined,
    utm_medium: urlParams.get('utm_medium') || undefined,
    utm_campaign: urlParams.get('utm_campaign') || undefined,
    utm_term: urlParams.get('utm_term') || undefined,
    utm_content: urlParams.get('utm_content') || undefined,
  };
};

// Store UTM params in session storage to persist across page loads
export const storeUTMParams = (): void => {
  const utmParams = getUTMParams();
  
  if (Object.values(utmParams).some(value => value !== undefined)) {
    sessionStorage.setItem('utmParams', JSON.stringify(utmParams));
  }
};

// Get UTM params from session storage
export const getStoredUTMParams = (): UTMParams => {
  const stored = sessionStorage.getItem('utmParams');
  return stored ? JSON.parse(stored) : {};
};