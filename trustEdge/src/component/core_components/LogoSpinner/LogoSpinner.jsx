import React from "react";
import justLogo from "../../../assets/just_logo.svg";

const LogoSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 p-6 select-none animate-fadeInUp">
      
      {/* Loader wrapper containing the centered Earth logo and outer spinning ring */}
      <div className="relative flex items-center justify-center w-24 h-24">
        
        {/* Animated outer gold orbit ring with tail-blur sweep and particle scatter */}
        <svg
          className="absolute w-20 h-20 animate-spin overflow-visible"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ animationDuration: "1.4s" }}
        >
          <defs>
            {/* Opacity trail gradient for the Adobe-style fade sweep */}
            <linearGradient id="orbitTrailGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C9A227" stopOpacity="1" />
              <stop offset="40%" stopColor="#E4C765" stopOpacity="0.8" />
              <stop offset="80%" stopColor="#E4C765" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#E4C765" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Thick gold spinner track with rounded end-caps and partial sweep segment */}
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke="url(#orbitTrailGrad)"
            strokeWidth="4.2"
            strokeDasharray="145 100"
            strokeLinecap="round"
          />
        </svg>

        {/* 
          Official brand logo centered static (uncropped, unmasked).
          Scaled up to fit perfectly inside the outer gold spinner ring.
        */}
        <img
          src={justLogo}
          className="absolute w-12 h-12 object-contain select-none pointer-events-none"
          alt="TrustEdge Logo"
        />
      </div>

      {/* Loading Secure Data text in Navy Blue using Lexend */}
      <span
        className="text-[11px] font-bold uppercase tracking-widest text-[#0B2545] mt-2 block"
        style={{ fontFamily: "'Lexend', sans-serif" }}
      >
        Loading Secure Data...
      </span>
    </div>
  );
};

export default LogoSpinner;