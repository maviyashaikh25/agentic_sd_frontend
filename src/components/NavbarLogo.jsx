import React from 'react';

const NavbarLogo = ({ className = 'h-8 w-8', gradientId = 'navbar-logo-gradient' }) => {
  return (
    <svg className={className} fill="none" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="20" x2="100" y1="20" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60A5FA" />
          <stop offset="1" stopColor="#A855F7" />
        </linearGradient>
      </defs>
      <path d="M60 15L98.9711 37.5V82.5L60 105L21.0289 82.5V37.5L60 15Z" fill="rgba(96, 165, 250, 0.05)" stroke={`url(#${gradientId})`} strokeWidth="2" />
      <circle cx="60" cy="35" fill="#60A5FA" r="3" />
      <circle cx="40" cy="50" fill="#60A5FA" r="3" />
      <circle cx="80" cy="50" fill="#A855F7" r="3" />
      <circle cx="40" cy="70" fill="#60A5FA" r="3" />
      <circle cx="80" cy="70" fill="#A855F7" r="3" />
      <circle cx="60" cy="85" fill="#A855F7" r="3" />
      <line stroke="#60A5FA" strokeOpacity="0.4" strokeWidth="1" x1="60" x2="40" y1="35" y2="50" />
      <line stroke="#A855F7" strokeOpacity="0.4" strokeWidth="1" x1="60" x2="80" y1="35" y2="50" />
      <line stroke="white" strokeOpacity="0.2" strokeWidth="1" x1="40" x2="80" y1="50" y2="50" />
      <line stroke="#60A5FA" strokeOpacity="0.4" strokeWidth="1" x1="40" x2="40" y1="50" y2="70" />
      <line stroke="#A855F7" strokeOpacity="0.4" strokeWidth="1" x1="80" x2="80" y1="50" y2="70" />
      <line stroke="#60A5FA" strokeOpacity="0.4" strokeWidth="1" x1="40" x2="60" y1="70" y2="85" />
      <line stroke="#A855F7" strokeOpacity="0.4" strokeWidth="1" x1="80" x2="60" y1="70" y2="85" />
      <line stroke="white" strokeOpacity="0.2" strokeWidth="1" x1="40" x2="80" y1="70" y2="70" />
      <circle className="animate-pulse" cx="60" cy="60" fill={`url(#${gradientId})`} r="8" />
    </svg>
  );
};

export default NavbarLogo;