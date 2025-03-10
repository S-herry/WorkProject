import React, { useState } from "react";
import Input from "../auth/Input";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ username, password, rememberMe });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-16 flex flex-col justify-center ms-5 md:ms-0"
    >
      <Input
        id="admin-account"
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      >
        管理員帳戶
      </Input>
      <Input
        id="admin-password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      >
        管理員密碼
      </Input>
      <div className="flex flex-col  mt-6 mr-7 ms-[8.5rem]">
        <div className="flex gap-2.5 self-start">
          <div className="border border-black border-solid">
            <label className="flex items-center justify-center shrink-0 rounded-xl border-4 border-solid bg-zinc-100 border-[#001321] h-[54px] w-[54px] cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="sr-only"
              />
              {rememberMe && <span className="text-[#001321] text-3xl">✓</span>}
            </label>
          </div>
          <span className="my-auto text-2xl font-bold text-zinc-300">
            記住我
          </span>
        </div>
      </div>
      <div className="text-end">
        <Button
          type="submit"
          color="bg-green-600"
          onClick={() => navigate("/")}
        >
          管理員登入
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
