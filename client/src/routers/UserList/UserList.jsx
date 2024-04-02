import { createUsers } from "../../creatFunctions/createUsers";

export const UserList = () => {
  let content = createUsers();

  return <>{content}</>;
};
