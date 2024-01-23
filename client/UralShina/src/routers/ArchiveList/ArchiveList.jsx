import { useFilter } from "../../hooks/useFilter";
import { useGetArhiveQuery } from "../../app/api/apiSlice";
import { createPosts } from "../../creatFunctions/createPosts";
import { useProgressCheck } from "../../hooks/useProgressCheck";

export const ArchiveList = () => {
  const { filterConfig, fillter } = useFilter("PostsPage");
  const objPosts = useGetArhiveQuery();
  const content = useProgressCheck(objPosts, {
    callBack: createPosts,
    fillter: { ...filterConfig },
  });
  return (
    <div>
      {fillter}
      <div>{content}</div>
    </div>
  );
};
