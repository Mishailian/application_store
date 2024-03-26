import { useSelector } from "react-redux";

export const User = (props) => {
  let user = useSelector((state) => state.usersTable)[props.userId];
  return (
    <div>
      <h1 data-testid="user-name-conteiner">{user}</h1>
    </div>
  );
};
