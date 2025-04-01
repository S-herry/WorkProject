const LanguageToggle = ({
  language,
  setLanguage,
}: {
  language: "tw" | "en";
  setLanguage: (lang: "tw" | "en") => void;
}) => {
  const isTw = language === "tw";

  return (
    <div className="flex gap-5">
      <label className="flex cursor-pointer gap-2">
        <span className="label-text">中文</span>
        <input
          type="checkbox"
          className="toggle theme-controller"
          checked={!isTw} // 勾選代表英文
          onChange={() => setLanguage(isTw ? "en" : "tw")} // 切換語言
        />
        <span className="label-text">English</span>
      </label>
    </div>
  );
};

export default LanguageToggle;
