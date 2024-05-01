import { useFilter } from "../../hooks/useFilter/useFilter";
import {
  useGetUndeclaredPostsQuery,
  useDeclaredPostMutation,
} from "../../app/api/apiSlice";
import { createObjects } from "../../creatFunctions/createObjects";
import { progressCheck } from "../../progressCheck";
import { staticApi } from "../../static/static";
import { PostBlock } from "../../auxСomponents/PostBlock";

export const UndeclaretedList = () => {
  var s = staticApi();
  var [chng] = useDeclaredPostMutation();
  const { filterConfig, fillter } = useFilter("PostsPage");
  var callBack = (data) => {
    let obj = fillter(data);
    return createObjects(obj, PostBlock, {
      path: s.names.undeclaredPosts,
      alternativeView: (postId) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            chng({ postId });
          }}
        >
          Зарегестрировать
        </button>
      ),
    });
  };
  const objPosts = useGetUndeclaredPostsQuery();
  const content = progressCheck(objPosts, callBack);
  return (
    <div>
      {fillter}
      <div>{content}</div>
    </div>
  );
};
