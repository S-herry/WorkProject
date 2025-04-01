import React from "react";
import Image from "../common/Image";
import { useTranslation } from "react-i18next";
const LoginHeader: React.FC = () => {
  const { t } = useTranslation();
  return (
    <header className="flex flex-col font-bold text-center text-white   ">
      <div className="max-lg:w-[800px] max-md:w-[600px] max-sm:w-[300px] ">
        <Image
          src="/static/images/logo.png"
          alt="Safety Education Center Logo"
          className="w-[600px]   max-lg:w-[600px] max-md:w-[400px] max-sm:w-[200px] "
        />
      </div>
      <hr className="mt-5 border-t-2 border-[#4D4D4D]" />
      <h1 className="mt-10 flex flex-col gap-4 leading-normal text-5xl max-lg:text-5xl max-md:text-4xl max-sm:text-xl  text-nowrap">
        <span> {t("SafetyEducationCenter")}</span>
        <span> {t("Dashboard")}</span>
      </h1>
    </header>
  );
};

export default LoginHeader;
