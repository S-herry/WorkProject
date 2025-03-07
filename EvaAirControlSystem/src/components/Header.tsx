import React from "react";
import Button from "./common/Button";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center mb-20">
      <h1 className="text-2xl font-bold text-center text-white max-sm:text-xl">
        <span>安全教育中心</span>
        <br />
        <span>內容管理儀表板</span>
      </h1>
      <Button>123</Button>
    </header>
  );
};

export default Header;
