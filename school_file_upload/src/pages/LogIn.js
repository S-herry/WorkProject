import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import user from "../components/images/user.png";
import Button from "../components/Button";
import Input_text from "../components/Input_text";
import { Form } from "react-bootstrap";
import { motion } from "framer-motion";
import FeatchUrl from "../components/FeatchUrl";
import Swal from "sweetalert2";
function addStyle(event) {
  event.target.style.boxShadow = "0px 0px 15px 2px rgba(137,185,173,0.54)";
  event.target.style.border = "1px solid #89b9ad";
}
function removeStyle(event) {
  event.target.style.boxShadow = ""; // Remove the border style
  event.target.style.border = "";
}

const LogIn = () => {
  let meta = document.querySelector('meta[name="csrf-token"]').content;
  const [password, setPassWord] = useState({
    email: "",
    password: "",
    csrfmiddlewaretoken: meta,
  });
  const [is_admin, setIsAdmin] = useState(false);
  const [successLogin, setSuccessLogin] = useState(false);

  function handelOnChange(event, type) {
    setPassWord((prevPassword) => ({
      ...prevPassword,
      [type]: event.target.value,
    }));
  }
  const submitUrl = () => {
    FeatchUrl({
      urls: "/login",
      method: "POST",
      dataName: "email",
      postdata: password,
      comeback: isOk,
    });
    function isOk(data) {
      if (data.isSuccess) {
        setSuccessLogin(true);
        setIsAdmin(data.is_admin);
      } else {
        Swal.fire({
          icon: "error",
          title: data.message,
          showConfirmButton: false,
          timer: 1200,
        });
      }
    }
  };
  let counselingUrl = document.querySelector(
    'meta[name="counselingUrl"]'
  ).content;
  let updatedDaily = document.querySelector(
    'meta[name="updatedDaily"]'
  ).content;
  return (
    <motion.div
      className="LogIn min-vh-100"
      initial={{
        opacity: 1,
        y: 0,
      }}
      animate={{
        opacity: successLogin ? 0 : 1,
        y: successLogin ? "-100%" : 0,
        transition: { duration: 1 },
      }}
      onAnimationComplete={() => {
        if (successLogin) {
          if (is_admin) {
            window.location.href = "/admin";
          } else {
            window.location.href = "/";
          }
        }
      }}
    >
      <div className="login_block">
        <header>
          {/* <img
            src="https://static.vecteezy.com/system/resources/previews/005/170/979/non_2x/education-book-hat-icon-for-college-academy-university-high-school-logo-design-free-vector.jpg"
            alt="loginImg"
            className="loginImg"
          /> */}
          <h2 className="text-center logoborder mt-5 ms-5 me-5 mb-3 p-3">
            大專校院學校衛生輔導 <br />
            資料上傳系統
          </h2>
          <small className="d-flex  align-items-center justify-content-center  p-0">
            <strong>開放上傳期間：</strong>
            <br />
            <strong>{updatedDaily}</strong>
          </small>
        </header>

        <main className="mb-5 d-flex flex-column align-items-center justify-content-center">
          <Form className="w-75" method="POST">
            <input
              type="hidden"
              name="csrfmiddlewaretoken"
              value={meta}
            ></input>
            <Form.Floating className="mt-4">
              <Form.Control
                id="floatingInputCustom"
                name="email"
                type="text"
                placeholder="name@example.com"
                onFocus={addStyle}
                onBlur={removeStyle}
                onChange={(event) => handelOnChange(event, "email")}
              />
              <label htmlFor="floatingInputCustom">帳號</label>
            </Form.Floating>
            <Form.Floating className="mb-3 mt-3">
              <Form.Control
                id="floatingPasswordCustom"
                type="password"
                name="password"
                placeholder="text"
                onFocus={addStyle}
                onBlur={removeStyle}
                onChange={(event) => handelOnChange(event, "password")}
              />
              <label htmlFor="floatingPasswordCustom">密碼</label>
            </Form.Floating>
            {/* {forgetPass ? null : (
              <Form.Floating className="mb-3 mt-3">
                <Form.Control
                  id="floatingPasswordCustom"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onFocus={addStyle}
                  onBlur={removeStyle}
                />
                <label htmlFor="floatingPasswordCustom">輸入新密碼</label>
              </Form.Floating>
            )} */}
            <div className="text-center">
              <Button
                title="登入"
                className="mb-3"
                variant="outline-success"
                onClick={submitUrl}
              ></Button>
              <Button
                title="輔導表件連結"
                className="ms-auto"
                bg="#c06c6c"
                onClick={() => (window.location.href = counselingUrl)}
              />
            </div>
          </Form>
        </main>
      </div>
    </motion.div>
  );
};

export default LogIn;
