/// <reference types="vite/client" />

declare namespace JSX {
  interface IntrinsicElements {
    'spline-viewer': {
      url: string;
      style?: React.CSSProperties;
    };
  }
}

declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}