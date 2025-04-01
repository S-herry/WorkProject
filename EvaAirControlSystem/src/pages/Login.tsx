import LoginHeader from "../components/login/LoginHeader";
import LoginForm from "../components/login/LoginForm";
import { redirect, ActionFunction } from "react-router-dom";
import url from "../assets/data/url.json";
import { useEffect, useContext } from "react";
import LanguageToggle from "../components/LanguageToggle";
import MachineContext from "../components/store/Machine-Context";

const Login = () => {
  const machine = useContext(MachineContext);
  const { language, SetLanguage } = machine;
  useEffect(() => {
    async function getInitToken() {
      try {
        const test = url.test ? url.host : "";
        const path = test + url.port.getToken;
        const res = await fetch(path, {
          credentials: "include", // 重要：確保請求攜帶 Cookie
        });
        if (!res.ok) {
          console.error("取得 token 失敗");
          return;
        }
        const token = await res.json();
        console.log("取得的 CSRF Token:", token.csrfToken);
        localStorage.setItem("csrfToken", token.csrfToken);
      } catch (error) {
        console.error("Token 請求錯誤", error);
      }
    }
    getInitToken();
  }, []);
  return (
    <div className="bg-MineBgColor flex flex-col  min-h-screen relative">
      <div className="p-5 text-xl flex justify-end">
        <LanguageToggle language={language} setLanguage={SetLanguage} />
      </div>
      <section className="flex my-auto  flex-col justify-center items-center  mx-auto ">
        <LoginHeader />
        <LoginForm />
      </section>
    </div>
  );
};

export default Login;

export const Action: ActionFunction = async ({ request }) => {
  const token = localStorage.getItem("csrfToken");

  const data = await request.formData();
  const login = {
    username: data.get("username"),
    password: data.get("password"),
  };

  const test = url.test ? url.host : "";
  const loginUrl = test + url.port.login;
  const res = await fetch(loginUrl, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": token || "",
    },
    body: JSON.stringify(login),
  });

  if (!res.ok) {
    return new Response(JSON.stringify({ message: "登入失敗" }), {
      status: 500,
    });
  }

  return redirect("/");
};
