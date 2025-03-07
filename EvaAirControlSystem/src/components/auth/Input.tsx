interface InputProps {
  value: string;
  id: string;
  type: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}
const Input = ({ onChange, value, id, type, children }: InputProps) => {
  return (
    <div className="flex flex-wrap gap-6 self-start mt-8 text-2xl font-bold whitespace-nowrap text-zinc-300">
      <label htmlFor={id} className="grow my-auto">
        {children}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange?.(e)}
        className="flex shrink-0 max-w-full rounded-md bg-zinc-100 text-black  py-1 px-2"
      />
    </div>
  );
};
export default Input;
