import { createTags } from "../../creatFunctions/createTags";
import { useGetTagsQuery } from "../../app/api/apiSlice";
import { useProgressCheck } from "../../hooks/useProgressCheck";
import { AddTag } from "./AddTag";

export const TagList = () => {
  const callback = (tags) => createTags(tags);
  const obj = useGetTagsQuery();
  const content = useProgressCheck(obj, { callBack: callback });
  return (
    <div>
      <h1>tag list</h1>
      {content}
      <AddTag />
    </div>
  );
};
