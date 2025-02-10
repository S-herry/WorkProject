import React, { useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";

const Hint = ({ children }) => {
  const [props, api] = useSpring(() => ({
    opacity: 0,
    config: { duration: 500 }, // 每次動畫持續 0.5 秒
  }));

  useEffect(() => {
    api.start({
      loop: { reverse: true },
      from: { opacity: 0 },
      to: { opacity: 1 },
    });
  }, [api]);

  return (
    <animated.div style={props} className="text-center p-2 darkText">
      {children}
    </animated.div>
  );
};

export default Hint;
