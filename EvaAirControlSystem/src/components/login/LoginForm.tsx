import React, { useState, useRef } from "react";
import Input from "../auth/Input";
import Button from "../common/Button";
import { Form } from "react-router-dom";
import { useTranslation } from "react-i18next";
const LoginForm: React.FC = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const loginData = useRef(null);
  const { t } = useTranslation();
  return (
    <Form
      ref={loginData}
      method="POST"
      className=" flex flex-col gap-4 justify-center "
    >
      <Input id="username" type="text">
        {t("OtherCommon.Account")}
      </Input>
      <Input id="password" type="password">
        {t("OtherCommon.Password")}
      </Input>
      <div className="flex gap-2 ms-auto  px-8 ">
        <div className="border border-black border-solid">
          <label className="flex items-center justify-center rounded-xl border-4 border-solid bg-zinc-100 border-[#001321] h-[50px] w-[50px] cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="sr-only"
            />
            {rememberMe && (
              <span className="text-[#001321] text-2xl font-bold ">✓</span>
            )}
          </label>
        </div>
        <span className="my-auto text-2xl max-lg:text-2xl  max-md:text-lg  max-sm:text-base font-bold text-zinc-300">
          {t("OtherCommon.Remember")}
        </span>
      </div>
      <div className="text-end mt-8 px-8">
        <Button type="submit" color="bg-green-600 px-2">
          <span className="text-2xl max-lg:text-2xl  max-md:text-lg  max-sm:text-base ">{`${t(
            "OtherCommon.Administrator"
          )}${t("OtherCommon.Login")}`}</span>
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
