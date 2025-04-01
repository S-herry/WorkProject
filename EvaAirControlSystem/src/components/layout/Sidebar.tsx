import React, { useContext } from "react";
import Button from "../common/Button";
import Image from "../common/Image";
import MenuContext from "../store/Menu-Context";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { clsx } from "clsx";

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const { menuItems, selectedMenu, SetSelectedItem, showMenu, SetShowMenu } =
    useContext(MenuContext);
  const navigate = useNavigate();

  return (
    <>
      <aside
        className={clsx(
          "fixed left-0 top-0 z-50 h-screen w-[345px] md:w-[300px] flex flex-col border-r border-gray-50/20 bg-MineBgColor",
          { visible: showMenu, "max-sm:hidden": !showMenu }
        )}
      >
        <div className="px-14 py-10">
          <Image src="/static/images/logo.png" alt="logo" />
        </div>

        <nav className="flex flex-col gap-3 px-8 overflow-y-auto flex-grow scrollbar text-nowrap">
          <h2 className="text-base font-semibold text-zinc-300">
            {t("ComputerEquipmentGroupList")}
          </h2>
          <div className="flex flex-col">
            {menuItems?.map((item) => {
              const isSelected = selectedMenu?.id === item.id;
              return (
                <Button
                  key={item.id}
                  color={clsx(
                    "py-3.5 text-left ps-3",
                    isSelected
                      ? "bg-[#009844]"
                      : "hover:bg-slate-900 text-[#BDBDBD]"
                  )}
                  onClick={() => {
                    navigate("../");
                    SetSelectedItem(item);
                  }}
                >
                  {t(item.group_name)}
                  {isSelected && (
                    <Image src="/static/images/ic_chevron.png" alt="icon" />
                  )}
                </Button>
              );
            })}
          </div>
        </nav>

        <div className="mx-10 mb-10">
          <div className="h-px border-gray-50/20 border" />
          <div className="grid gap-5 mt-5">
            <Button
              color={clsx(
                "py-3.5",
                selectedMenu?.id === 9999 ? "bg-PowerOn" : "bg-[#455471]"
              )}
              onClick={() => {
                navigate("..");
                SetSelectedItem({
                  id: 9999,
                  group_name: t("OtherCommon.PowerControl"),
                });
              }}
            >
              {t("OtherCommon.PowerControl")}
            </Button>
          </div>
        </div>
      </aside>

      {/* 遮罩層 (僅在手機模式顯示) */}
      {showMenu && (
        <div
          onClick={() => SetShowMenu()}
          className="fixed inset-0 bg-black/80 sm:hidden z-20"
        ></div>
      )}
    </>
  );
};

export default Sidebar;
