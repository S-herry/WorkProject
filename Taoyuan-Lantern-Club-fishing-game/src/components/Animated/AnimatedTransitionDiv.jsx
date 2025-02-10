import { animated } from "@react-spring/web";
import { createPortal } from "react-dom";
const AnimatedTransitionDiv = ({ transitions, children }) => {
  return (
    transitions &&
    transitions((style, item) => {
      return createPortal(
        item && (
          <animated.div
            className="d-flex position-absolute align-items-center justify-content-center z-1 w-100  vh-100"
            style={{
              ...style,
            }}
          >
            <div className="position-absolute w-100 min-vh-100 bg-black opacity-75"></div>
            <div className="card text-center my-auto w-75 d-flex  flex-column justify-content-center align-items-center">
              {children}
            </div>
          </animated.div>
        ),
        document.getElementById("modal")
      );
    })
  );
};

export default AnimatedTransitionDiv;
