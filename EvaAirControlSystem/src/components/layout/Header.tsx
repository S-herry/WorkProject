import React, { useContext } from "react";
import Button from "../common/Button";
import MenuContext from "../store/Menu-Context";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigation = useNavigate();
  const menu = useContext(MenuContext);
  const { SetShowMenu } = menu;
  return (
    <header className="flex justify-evenly items-center my-10 absolute top-0  pl-[21.5rem]  max-sm:pl-0 w-full ">
      <div>
        <button
          onClick={SetShowMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
      <h1 className="text-2xl font-bold text-center text-white max-sm:text-xl">
        <span>安全教育中心</span>
        <br />
        <span>內容管理儀表板</span>
      </h1>
      <Button
        size="sm"
        color="bg-[#FF6666]"
        onClick={() => navigation("/login")}
      >
        登出
      </Button>
    </header>
  );
};

export default Header;
