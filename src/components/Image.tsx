interface ImageProps {
  src: string;
  alt?: string;
  className?: string;
}

function Image({ src, alt = "", className }: ImageProps) {
  return (
    <>
      {src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={`w-full h-full object-cover ${className}`}
        />
      ) : (
        <div className="bg-secondary w-full h-full"></div>
      )}
    </>
  );
}

export default Image;
