interface ImageProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
}

const Image = ({ src, alt, width, height }: ImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className="object-cover"
    />
  );
};

export default Image;
