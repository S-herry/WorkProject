import { useParams } from "react-router-dom";

const UserData = () => {
  const { id } = useParams<{ id: string }>();
  return <div>使用者 ID: {id}</div>;
};

export default UserData;
