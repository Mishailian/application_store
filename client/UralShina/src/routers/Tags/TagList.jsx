import { AddTag } from "./AddTag";
import { useGetTagsQuery } from "../../app/api/apiSlice";
import { createTags } from "../../creatFunctions/createTags";
import { useProgressCheck } from "../../hooks/useProgressCheck";

export const TagList = () => {
  const obj = useGetTagsQuery();
  const callback = (tags) => createTags(tags);
  const content = useProgressCheck(obj, { callBack: callback });
  return (
    <div>
      <h1>tag list</h1>
      {content}
      <AddTag />
    </div>
  );
};
