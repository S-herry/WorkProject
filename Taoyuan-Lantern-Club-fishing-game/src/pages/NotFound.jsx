import { useRouteError } from "react-router-dom";

const NotFound = () => {
  const error = useRouteError();
  return (
    <div>
      <h1>Error</h1>
      <p>{error.message || "An unknown error occurred."}</p>
    </div>
  );
};

export default NotFound;
