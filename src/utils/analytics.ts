// Google Analytics (GA4) implementation

export const initializeGA = (measurementId: string): void => {
  if (!measurementId) return;

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', measurementId);

  window.gtag = gtag;
};

export const trackNewsletterSignup = (formData: Record<string, any>): void => {
  if (!window.gtag) return;
  
  window.gtag('event', 'newsletter_signup', {
    ...formData,
    event_category: 'engagement',
    event_label: 'newsletter_subscription',
  });
};

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}