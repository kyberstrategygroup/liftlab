import React from 'react';

export default function VideoEmbed({ 
  url, 
  title = "Video",
  className = "",
  aspectRatio = "16/9"
}) {
  // Convert YouTube watch URL to embed URL
  const getEmbedUrl = (videoUrl) => {
    if (!videoUrl) return null;
    
    // Already an embed URL
    if (videoUrl.includes('/embed/')) {
      return videoUrl;
    }
    
    // YouTube watch URL
    const watchMatch = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
    if (watchMatch) {
      return `https://www.youtube.com/embed/${watchMatch[1]}`;
    }
    
    // YouTube playlist
    if (videoUrl.includes('playlist?list=')) {
      const playlistId = videoUrl.match(/list=([^&]+)/)?.[1];
      if (playlistId) {
        return `https://www.youtube.com/embed/videoseries?list=${playlistId}`;
      }
    }
    
    return videoUrl;
  };

  const embedUrl = getEmbedUrl(url);

  if (!embedUrl) {
    return (
      <div 
        className={`bg-zinc-900 flex items-center justify-center ${className}`}
        style={{ aspectRatio }}
      >
        <p className="text-zinc-500">Video unavailable</p>
      </div>
    );
  }

  return (
    <div 
      className={`relative w-full overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      <iframe
        src={embedUrl}
        title={title}
        className="absolute inset-0 w-full h-full"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}