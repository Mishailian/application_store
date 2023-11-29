import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const User = (props) => {
  let user = useSelector((state) => state.users.users);
  user = user.find((u) => u.id == props.userId);

  return (
    <div>
      <h1>{user.name}</h1>
    </div>
  );
};
