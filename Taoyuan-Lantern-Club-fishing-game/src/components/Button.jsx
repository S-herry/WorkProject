import { useContext } from "react";
import classNames from "classnames";
import Button_UI from "../assets/main/Button_UI.png";
import { UnityContext } from "../content/GetFishUnity";

const Button = ({
  onClick,
  show = true,
  style,
  children,
  className,
  size = "50",
}) => {
  const { handleButtonClick } = useContext(UnityContext);

  const handleClick = (event) => {
    handleButtonClick();
    onClick?.(event);
  };

  return (
    <button
      onClick={handleClick}
      className={classNames(
        "flex-column position-relative border-0 top-0 d-flex justify-content-center align-items-center bg-transparent ",
        className
      )}
      style={{
        visibility: show ? "visible" : "hidden",
        width: `${size}%`,
        ...style,
      }}
    >
      <img src={Button_UI} className="z-0 w-100" />
      <p className="position-absolute text-center text-wrap w-75 m-0 h4 p-0 text-white">
        {children}
      </p>
    </button>
  );
};

export default Button;
