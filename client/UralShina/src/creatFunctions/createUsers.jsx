import { staticApi as s } from "../static/static";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { User } from "../routers/User/User";

export const createUsers = (fillter) => {
  const { users } = useSelector((state) => state.users);
  const navigate = useNavigate();
  return users.map((user) => (
    <div key={user["id"]}>
      <User userId={user["id"]} />
      <button
        onClick={() =>
          navigate(`${s.paths.users}${user["id"]}/`, {
            state: { name: user["name"] },
          })
        }
      ></button>
    </div>
  ));
};
