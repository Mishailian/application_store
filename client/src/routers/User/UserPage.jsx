import { useParams } from "react-router-dom";
import { useGetFilterPostsQuery } from "../../app/api/apiSlice";
import { progressCheck } from "../../progressCheck";
import { createObjects } from "../../creatFunctions/createObjects";
import { User } from "./User";
import { useFilter } from "../../hooks/useFilter/useFilter";
import { PostBlock } from "../../auxСomponents/PostBlock";

export const UserPage = () => {
  const { userId } = useParams("userId");
  const objPosts = useGetFilterPostsQuery({ ex_i: userId });
  var { fillter, fillterJsx } = useFilter("UserPage");
  var callBack = (data) => {
    var objects = fillter(data);
    return createObjects(objects, PostBlock, {
      alternativeView: () => <h2>👦</h2>,
      path: "store",
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
