import React, { useState, useRef, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Collapse, Card } from "react-bootstrap";
import Button from "../components/Button";
import Footer from "../components/Footer";
const Layout = () => {
  let is_authenticated = document.querySelector(
    'meta[name="is_authenticated"]'
  ).content;

  is_authenticated = JSON.parse(is_authenticated);

  const [show, setShow] = useState(false);
  function onClicklogout() {
    setShow(!show);
  }
  const motionDivRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        motionDivRef.current &&
        !motionDivRef.current.contains(event.target)
      ) {
        setShow(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [show]);

  return (
    <>
      <div className="d-flex flex-column">
        {is_authenticated && (
          <motion.div
            ref={motionDivRef}
            initial={{ opacity: 0, x: show ? "10%" : "80%" }} // 初始位置位于屏幕右侧之外
            animate={{ opacity: 1, x: show ? "10%" : "80%" }} // 这里你可能需要调整目标位置，根据你的需求
            transition={{ duration: 0.5 }}
            className="rightTop"
            style={{ position: "fixed", right: 0, top: 0, zIndex: 1020 }} // 设置 right: 0 以确保位于屏幕右侧
            onClick={onClicklogout}
          >
            <p
              className="m-0 pt-2 pb-2 ps-2 pe-4 btnP"
              style={{}}
              onClick={() => (window.location.href = "/logout")}
            >
              登出
            </p>
          </motion.div>
        )}

        <div className="d-flex flex-column  min-vh-100">
          <Outlet />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
