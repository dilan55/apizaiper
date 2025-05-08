/// <reference types="vite/client" />

// Define gtag for Google Analytics
interface Window {
  dataLayer: any[];
  gtag: (...args: any[]) => void;
}