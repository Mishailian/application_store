import { useParams, useLocation } from "react-router-dom";
import { useGetFilterPostsQuery } from "../../app/api/apiSlice";
import { useProgressCheck } from "../../hooks/useProgressCheck";
import { createPosts } from "../../creatFunctions/createPosts";
import { User } from "./User";
import { useFilter } from "../../hooks/useFilter";

export const UserPage = () => {
  const { userId } = useParams("userId");
  const objPosts = useGetFilterPostsQuery({ ex_i: userId });
  const { filterConfig, fillter } = useFilter("UserPage");
  const content = useProgressCheck(objPosts, {
    callBack: createPosts,
    fillter: { ...filterConfig },
  });

  return (
    <div>
      <User userId={userId} />
      {content}
      {fillter}
    </div>
  );
};
