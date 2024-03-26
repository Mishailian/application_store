import { useFilter } from "../../hooks/useFilter/useFilter";
import { useGetUndeclaredPostsQuery } from "../../app/api/apiSlice";
import { createObjects } from "../../creatFunctions/createPosts";
import { progressCheck } from "../../progressCheck";
import { UndeclaretedPostBlock } from "./blocks/UndeclaretedPostBlock";

export const UndeclaretedList = () => {
  const { filterConfig, fillter } = useFilter("PostsPage");
  const undeclaretedPosts = (data) =>
    createObjects(data, UndeclaretedPostBlock);
  const objPosts = useGetUndeclaredPostsQuery();
  const content = progressCheck(objPosts, undeclaretedPosts);
  return (
    <div>
      {fillter}
      <div>{content}</div>
    </div>
  );
};
