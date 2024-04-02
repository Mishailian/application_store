import { AddTag } from "./AddTag";
import { useGetTagsQuery } from "../../app/api/apiSlice";
import { createTags } from "../../creatFunctions/createTags";
import { progressCheck } from "../../progressCheck";

export const TagList = () => {
  const obj = useGetTagsQuery();
  const callback = (tags) => createTags(tags);
  const content = progressCheck(obj, callback);
  return (
    <div>
      <h1>tag list</h1>
      {content}
      <AddTag />
    </div>
  );
};
