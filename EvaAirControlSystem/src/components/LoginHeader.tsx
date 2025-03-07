import React from "react";

const LoginHeader: React.FC = () => {
  return (
    <header className="flex flex-col text-5xl font-bold text-center text-white   ">
      <img
        src="/images/logo.png"
        alt="Safety Education Center Logo"
        className="object-contain self-center"
      />
      <hr className="mt-10  border-t-2 border-[#4D4D4D]" />
      <h1 className="mt-16 leading-normal ">
        安全教育中心
        <br /> 內容管理儀表板
      </h1>
    </header>
  );
};

export default LoginHeader;
