interface TabProps {
  title: string | null;
}
const TabSection = ({ title }: TabProps) => {
  return (
    <div className="my-10 flex flex-col ">
      <h2 className="mb-5 text-lg font-semibold text-white">{title}</h2>
      <div className="h-px border  border-gray-50/20 " />
    </div>
  );
};

export default TabSection;
