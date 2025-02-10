import React from "react";
import Form from "react-bootstrap/Form";

const Select = ({
  type,
  setSelectValue,
  size,
  className,
  selected,
  defaultValue,
  children,
}) => {
  function handleChange(event, type) {
    let changeVal = event.target.value;
    setSelectValue((prevValue) => ({
      ...prevValue,
      [type]: changeVal,
    }));
  }

  function addStyle(event) {
    event.target.style.boxShadow = "0px 0px 15px 2px rgba(137,185,173,0.54)";
    event.target.style.border = "1px solid #89b9ad";
  }
  function removeStyle(event) {
    event.target.style.boxShadow = ""; // Remove the border style
    event.target.style.border = "";
  }
  return (
    <Form.Select
      className={className}
      size={size}
      style={{ width: "200px" }}
      onFocus={addStyle}
      onBlur={removeStyle}
      onChange={(event) => handleChange(event, type)}
      selected={selected}
      defaultValue={defaultValue}
    >
      {children}
    </Form.Select>
  );
};

export default Select;
