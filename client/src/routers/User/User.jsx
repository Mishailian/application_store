import { useSelector } from "react-redux";

export const User = (props) => {
  let user = useSelector((state) => state.users.usersTable)[props.userId];
  return (
    <div className="w-32 h-32 flex items-center justify-center">
      <p className="text-xl" data-testid="user-name-conteiner">
        {user}
      </p>
    </div>
  );
};
