import LoginHeader from "../components/login/LoginHeader";
import LoginForm from "../components/login/LoginForm";
import { redirect } from "react-router-dom";

const Login = () => {
  return (
    <section className=" bg-slate-950 min-h-screen flex flex-col justify-center items-center ">
      <LoginHeader />
      <LoginForm />
    </section>
  );
};

export default Login;

export async function action() {
  try {
    const res = await fetch("/login", { method: "POST", headers: {} });
    if (!res.ok) {
      throw new Error("請求失敗");
    }
    const { data } = await res.json();
    console.log(data);

    return redirect("/");
  } catch (error: unknown) {
    console.error("錯誤:", error);
    return { error: error };
  }
}
