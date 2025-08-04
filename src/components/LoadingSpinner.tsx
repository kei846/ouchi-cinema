import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <svg className="loader" viewBox="0 0 24 24">
        <circle className="loader-circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"></circle>
        <circle className="loader-path" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"></circle>
      </svg>
      <style jsx>{`
        .loader {
          width: 60px;
          height: 60px;
          animation: loader-spin 1.2s linear infinite;
        }
        .loader-circle {
          opacity: 0.25;
        }
        .loader-path {
          stroke-dasharray: 1, 200;
          stroke-dashoffset: 0;
          animation: loader-dash 1.2s ease-in-out infinite, glow 1.5s ease-in-out infinite alternate; /* Added glow */
          stroke: #fff; /* White color for the moving path */
        }
        .loader.fade-out {
          animation: crack-and-fade 1s forwards; /* Apply crack-and-fade */
        }
        @keyframes loader-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes loader-dash {
          0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
          }
          50% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -35px;
          }
          100% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -124px;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
