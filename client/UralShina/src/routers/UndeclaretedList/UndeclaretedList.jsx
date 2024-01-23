import { useFilter } from "../../hooks/useFilter";
import { useGetUndeclaredPostsQuery } from "../../app/api/apiSlice";
import { createUndeclaretedPosts } from "../../creatFunctions/createPosts";
import { useProgressCheck } from "../../hooks/useProgressCheck";

export const UndeclaretedList = () => {
  const { filterConfig, fillter } = useFilter("PostsPage");
  const objPosts = useGetUndeclaredPostsQuery();
  const content = useProgressCheck(objPosts, {
    callBack: createUndeclaretedPosts,
    fillter: { ...filterConfig },
  });
  return (
    <div>
      {fillter}
      <div>{content}</div>
    </div>
  );
};
