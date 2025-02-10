import { Suspense } from "react";

const ImageLoading = ({ children, alt, width, height }) => {
  return (
    <Suspense fallback={<Loading alt={alt} width={width} height={height} />}>
      {children}
    </Suspense>
  );
};
const Loading = ({ alt, width, height }) => {
  return (
    <div
      className=" d-flex justify-content-center align-items-center"
      style={{
        width: width,
        height: height,
      }}
    >
      {alt} loading...
    </div>
  );
};

export default ImageLoading;
