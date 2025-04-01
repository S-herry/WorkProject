import React from "react";
import { clsx } from "clsx";

interface ImageProps {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  show?: boolean;
  className?: string;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  show = true,
  width,
  height,
  className,
}) => {
  if (!show) return null;

  // 確保 src 不會強制加 `/static`，允許外部傳完整 URL

  return (
    <img
      src={src}
      alt={alt}
      {...(width ? { width } : {})}
      {...(height ? { height } : {})}
      className={clsx("object-cover inline", className)}
    />
  );
};

export default Image;
