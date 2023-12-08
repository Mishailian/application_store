import { useFilter } from "../../hooks/useFilter";
import { useGetPostsQuery } from "../../app/api/apiSlice";
import { createPosts } from "../../creatFunctions/createPosts";
import { useProgressCheck } from "../../hooks/useProgressCheck";

export const PostsList = () => {
  const { filterConfig, fillter } = useFilter("PostsPage");
  const objPosts = useGetPostsQuery();
  const content = useProgressCheck(objPosts, {
    callBack: createPosts,
    fillter: { ...filterConfig },
  });
  return (
    <div>
      <div>{content}</div>
      {fillter}
    </div>
  );
};
