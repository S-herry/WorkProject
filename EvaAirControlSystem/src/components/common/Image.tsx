interface ImageProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  show?: boolean;
}

const Image = ({ src, alt, show = true, width, height }: ImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`object-cover inline ${show ? "visible" : "hidden"}`}
    />
  );
};

export default Image;
