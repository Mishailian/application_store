import { createUsers } from "../../creatFunctions/createUsers";

export const UserList = () => {
  let content = createUsers();

  return <div className="userList flex mt-4 ml-24 gap-24">{content}</div>;
};
