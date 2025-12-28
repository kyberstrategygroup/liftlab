import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight } from 'lucide-react';

export default function CTAButton({ 
  children, 
  to, 
  variant = "primary", 
  size = "default",
  icon = true,
  className = "",
  onClick,
  external = false
}) {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-bold uppercase tracking-wider transition-all duration-300 group";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/25",
    secondary: "bg-white text-black hover:bg-zinc-100",
    outline: "border-2 border-white text-white hover:bg-white hover:text-black",
    outlineDark: "border-2 border-black text-black hover:bg-black hover:text-white"
  };

  const sizes = {
    small: "px-5 py-2.5 text-xs",
    default: "px-8 py-4 text-sm",
    large: "px-10 py-5 text-base"
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {children}
      {icon && (
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );

  if (external) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={combinedStyles}>
        {content}
      </a>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className={combinedStyles}>
        {content}
      </button>
    );
  }

  // Handle hash navigation
  const handleClick = (e) => {
    if (to.includes('#')) {
      const [page, hash] = to.split('#');
      const targetUrl = createPageUrl(page);
      
      // If we're already on the target page, just scroll
      if (window.location.pathname === targetUrl || window.location.pathname === `/${page}`) {
        e.preventDefault();
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        return;
      }
      
      // Otherwise, navigate and scroll after page loads
      e.preventDefault();
      window.location.href = targetUrl + '#' + hash;
    }
  };

  return (
    <Link to={createPageUrl(to)} className={combinedStyles} onClick={handleClick}>
      {content}
    </Link>
  );
}