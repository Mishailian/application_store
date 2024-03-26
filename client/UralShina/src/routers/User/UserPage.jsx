import { useParams } from "react-router-dom";
import { useGetFilterPostsQuery } from "../../app/api/apiSlice";
import { progressCheck } from "../../progressCheck";
import { createObjects } from "../../creatFunctions/createPosts";
import { User } from "./User";
import { staticApi } from "../../static/static";
import { useFilter } from "../../hooks/useFilter/useFilter";

export const UserPage = () => {
  const { userId } = useParams("userId");
  var s = staticApi();
  const objPosts = useGetFilterPostsQuery({ ex_i: userId });
  var { fillter, fillterJsx } = useFilter("UserPage");
  var callBack = (data) => {
    var objects = fillter(data);
    return createObjects(objects, s.structure.postBlock, {
      alternativeView: true,
    });
  };
  const result = progressCheck(objPosts, callBack);

  return (
    <div>
      <User userId={userId} />
      {fillterJsx}
      {result}
    </div>
  );
};
