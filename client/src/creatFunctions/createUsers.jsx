//import { staticApi } from "../static/static";
import { useNavigate } from "react-router-dom";
import { User } from "../routers/User/User";
import { useSelector } from "react-redux";

export const createUsers = () => {
  var result = [];
  const users = useSelector((state) => state.users.usersTable) 
  const navigate = useNavigate();
  if (typeof users == 'undefined') throw new Error('users is null or undef')
// var s = staticApi();
// div блок в др файл 
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
