import React from 'react';
import style from './style.css'; // Import your CSS file for styles

const LoadingAnimation = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      {/* Customized loader with a child-friendly icon */}
      <div className="loader">
        {/* Modern loading animation */}
        <div className="spinner">
          <div className="spinner-item"></div>
          <div className="spinner-item"></div>
          <div className="spinner-item"></div>
          <div className="spinner-item"></div>
          <div className="spinner-item"></div>
          <div className="spinner-item"></div>
          <div className="spinner-item"></div>
          <div className="spinner-item"></div>
          <div className="spinner-item"></div>
          <div className="spinner-item"></div>
          <div className="spinner-item"></div>
          <div className="spinner-item"></div>
          <div className="spinner-item"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
