import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import SmartImage from './SmartImage';

const PhotoGallery = ({ images = [], emoji = '📷', color = '#8B1A2E', name = '' }) => {
  const [open, setOpen] = useState(null);

  const close = useCallback(() => setOpen(null), []);
  const go = useCallback((dir) => {
    setOpen(prev => (prev === null ? prev : (prev + dir + images.length) % images.length));
  }, [images.length]);

  useEffect(() => {
    if (open === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close, go]);

  if (!images.length) return null;

  return (
    <div>
      <div className="flex items-center gap-1.5 mb-2">
        <Camera size={13} className="text-inkfaint" />
        <span className="text-inkfaint text-xs font-semibold uppercase tracking-widest">Galerie — {name}</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setOpen(i)}
            className="group relative rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-paper"
            style={{ '--tw-ring-color': color }}
            aria-label={`Photo ${i + 1} de ${name}`}
          >
            <SmartImage src={src} alt={`${name} ${i + 1}`} emoji={emoji} color={color} className="h-24 sm:h-28">
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </SmartImage>
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={close}
        >
          <button onClick={close} className="absolute top-4 right-4 text-white/70 hover:text-white p-2" aria-label="Fermer">
            <X size={28} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); go(-1); }}
            className="absolute left-2 sm:left-6 text-white/60 hover:text-white p-2"
            aria-label="Photo précédente"
          >
            <ChevronLeft size={36} />
          </button>
          <img
            src={images[open]}
            alt={`${name} ${open + 1}`}
            className="max-h-[80vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => { e.stopPropagation(); go(1); }}
            className="absolute right-2 sm:right-6 text-white/60 hover:text-white p-2"
            aria-label="Photo suivante"
          >
            <ChevronRight size={36} />
          </button>
          <div className="absolute bottom-5 left-0 right-0 text-center text-white/70 text-sm font-semibold">
            {emoji} {name} · {open + 1}/{images.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
