import LoginHeader from "../components/LoginHeader";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <section className=" bg-slate-950 min-h-screen flex flex-col justify-center items-center ">
      <LoginHeader />
      <LoginForm />
    </section>
  );
};

export default Login;
