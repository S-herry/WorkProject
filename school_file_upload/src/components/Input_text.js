import React from "react";
import Form from "react-bootstrap/Form";
const Input_text = ({
  label,
  type,
  setInputValue,
  size = "lg",
  InputType = "text",
  className,
  InputValue,
  disabled = false,
  maxLength,
  name,
  ...props
}) => {
  function handleChange(event, type) {
    let changeVal = event.target.value;
    setInputValue((prevValue) => ({
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
    <>
      <Form.Label className="p-0 m-0 me-2">{label}</Form.Label>
      <Form.Control
        name={name}
        className={className}
        size={size}
        type={InputType}
        style={{ width: "200px" }}
        onFocus={addStyle}
        onBlur={removeStyle}
        aria-label="Default"
        aria-describedby="inputGroup-sizing-default"
        value={InputValue}
        onChange={(event) => handleChange(event, type)}
        disabled={disabled}
        maxLength={maxLength}
        rows={5}
        {...props}
      />
    </>
  );
};

export default Input_text;
