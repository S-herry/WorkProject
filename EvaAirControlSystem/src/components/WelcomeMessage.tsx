import React from "react";
import { useTranslation } from "react-i18next";

const WelcomeMessage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <article className="lg:text-2xl leading-normal text-stone-300 md:text-2xl sm:text-xl">
      <span>{t("WelcomeContent.WelcomeMessage")}</span>
      <br />
      <span>{t("WelcomeContent.DashboardTitle")}</span>
      <br />
      <span>{t("WelcomeContent.SelectDevicePrompt")}</span>
    </article>
  );
};

export default WelcomeMessage;
