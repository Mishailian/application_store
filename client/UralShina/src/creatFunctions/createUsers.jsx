import { staticApi } from "../static/static";
import { useNavigate } from "react-router-dom";
import { User } from "../routers/User/User";
import { useSelector } from "react-redux";

export const createUsers = (fillter) => {
  const users = useSelector((state) => state.usersTable);
  const navigate = useNavigate();
  var result = [];
  var s = staticApi();

  for (var [id, userName] of Object.entries(users)) {
    var handleleClick = ((id) => () => {
      navigate(`${id}/`, {
        state: { name: userName },
      });
    })(id);
    result.push(
      <div key={id}>
        <User userId={id} />
        <button data-testid="user-list-button" onClick={handleleClick}></button>
      </div>
    );
  }
  return result;
};
