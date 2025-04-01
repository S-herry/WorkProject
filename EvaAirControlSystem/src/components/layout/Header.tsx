import React, { useContext } from "react";
import Button from "../common/Button";
import MenuContext from "../store/Menu-Context";
import MachineContext from "../store/Machine-Context";
import TabSection from "../TabSection";
import LanguageToggle from "../LanguageToggle";
import { useTranslation } from "react-i18next";

const Header: React.FC = () => {
  const { t } = useTranslation();
  const menu = useContext(MenuContext);
  const machine = useContext(MachineContext);
  const { SetShowMenu, selectedMenu } = menu;
  const { language, SetLanguage } = machine;
  return (
    <>
      <header className="my-10 absolute top-0  pl-[21.5rem] max-sm:pl-0 w-full ">
        <div className="flex justify-between items-center me-8 ">
          <button
            onClick={SetShowMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 "
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path stroke="currentColor" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-center text-white max-sm:text-xl max-md:hidden mx-auto text-nowrap">
            <span>{t("SafetyEducationCenter")}</span>
            <br />
            <span>{t("Dashboard")}</span>
          </h1>
          <div className="flex  gap-5">
            <LanguageToggle language={language} setLanguage={SetLanguage} />
            <Button
              size="md"
              color="bg-[#FF6666] px-5 py-0"
              onClick={() => {
                location.href = "/logout";
              }}
            >
              {t("OtherCommon.Logout")}
            </Button>
          </div>
        </div>
        <TabSection
          title={
            selectedMenu ? t(selectedMenu.group_name) ?? null : t("Welcome")
          }
        />
      </header>
    </>
  );
};

export default Header;
