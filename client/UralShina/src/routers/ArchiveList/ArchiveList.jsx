import { useGetArhiveQuery } from "../../app/api/apiSlice";
import { createObjects } from "../../creatFunctions/createPosts";
import { progressCheck } from "../../progressCheck";
import { useFilter } from "../../hooks/useFilter/useFilter";

export const ArchiveList = () => {
  const { filterConfig, fillter } = useFilter("PostsPage");
  const objPosts = useGetArhiveQuery();
  const content = progressCheck(objPosts, {
    callBack: createObjects,
    fillter: { ...filterConfig },
  });
  return (
    <div>
      {fillter}
      <div>{content}</div>
    </div>
  );
};
