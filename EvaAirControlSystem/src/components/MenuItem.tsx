interface MenuItemProps {
  text: string;
  isActive?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ text, isActive = false }) => {
  return (
    <button
      className={`px-28 py-4 text-lg duration-[0.3s] text-stone-300 transition-[background-color] max-md:px-10 max-md:py-4 text-left ${
        isActive ? "bg-slate-800" : "hover:bg-slate-900"
      }`}
    >
      {text}
    </button>
  );
};

export default MenuItem;
