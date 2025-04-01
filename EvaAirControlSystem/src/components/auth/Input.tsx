interface InputProps {
  id: string;
  value?: string;
  type?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}
const Input = ({ onChange, value, id, type, children }: InputProps) => {
  return (
    <div className="flex flex-wrap w-full gap-6 self-start mt-8  px-8  text-2xl max-lg:text-2xl  max-md:text-lg  max-sm:text-base font-bold whitespace-nowrap text-zinc-300">
      <label htmlFor={id} className="my-auto flex-1">
        {children}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange?.(e)}
        className=" flex-1 rounded-md bg-zinc-100 text-black  py-1 px-2"
      />
    </div>
  );
};
export default Input;
