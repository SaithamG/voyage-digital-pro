import React, { useState } from 'react';

const SmartImage = ({ src, alt, emoji = '📍', color = '#8B1A2E', className = '', imgClassName = '', children }) => {
  const [status, setStatus] = useState(src ? 'loading' : 'error');

  return (
    <div className={`relative overflow-hidden bg-surface2 ${className}`}>
      {status === 'error' ? (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${color} 0%, #2C2118 130%)` }}
        >
          <span className="text-5xl opacity-40 select-none">{emoji}</span>
        </div>
      ) : (
        <>
          {status === 'loading' && (
            <div className="absolute inset-0 animate-pulse bg-surface2" />
          )}
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onLoad={() => setStatus('loaded')}
            onError={() => setStatus('error')}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${status === 'loaded' ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
          />
        </>
      )}
      {children}
    </div>
  );
};

export default SmartImage;
