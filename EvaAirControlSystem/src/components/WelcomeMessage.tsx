import React from "react";

const WelcomeMessage: React.FC = () => {
  return (
    <article className="text-3xl leading-normal text-stone-300 max-md:text-2xl max-sm:text-2xl">
      <span>歡迎使用安全教育中心!</span>
      <br />
      <span>內容管理儀表板，</span>
      <br />
      <span>請點選左側設備列表查看詳情。</span>
    </article>
  );
};

export default WelcomeMessage;
