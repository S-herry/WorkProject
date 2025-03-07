interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  color?: string;
  type?: string;
}
const Button = ({ color, children, onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      className={`self-end px-8 mt-12 text-xl font-semibold text-center text-white whitespace-nowrap rounded-md shadow-lg py-4 ${color}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
