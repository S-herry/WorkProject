const ImageBlock = ({ src, alt }) => (
  <div className="image-container">
    <img src={src} alt={alt} className="image" loading="lazy" />
  </div>
);

export default ImageBlock;
