import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const Button = ({
  link,
  title = "搜尋",
  bg = "#92c7cf ",
  thisType,
  setValue,
  onClick,
  type = "button",
  disabled,
  ref,
  ...props
}) => {
  function handleClick() {
    // 取得當前值
    setValue &&
      setValue((prevValue) => ({
        ...prevValue,
        [thisType]: !prevValue[thisType],
      }));
  }

  return (
    <>
      {link ? (
        <Link key="myKey" to={link}>
          {title}
        </Link>
      ) : (
        <button
          type={type}
          ref={ref}
          style={{
            backgroundColor: title === "刪除" ? "#e9967a" : bg,
            color: "#fbf9f1",
            borderRadius: "5px",
            border: "none",
            padding: "6px 12px",
            transition: "background-color 0.3s ease",
            margin: "5px",
            whiteSpace: "nowrap",
          }}
          onClick={handleClick && onClick}
          disabled={disabled}
          {...props}
        >
          {title}
        </button>
      )}
    </>
  );
};

export default Button;
