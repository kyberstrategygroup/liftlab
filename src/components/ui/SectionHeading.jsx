import React from 'react';

export default function SectionHeading({ 
  title, 
  subtitle, 
  alignment = "center",
  dark = false,
  className = ""
}) {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right"
  };

  return (
    <div className={`${alignmentClasses[alignment]} ${className}`}>
      {subtitle && (
        <p className={`text-xs sm:text-sm font-bold uppercase tracking-[0.2em] mb-2 sm:mb-3 ${dark ? 'text-blue-400' : 'text-blue-600'}`}>
          {subtitle}
        </p>
      )}
      <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight klavika-header ${dark ? 'text-white' : 'text-black'}`}>
        {title}
      </h2>
    </div>
  );
}