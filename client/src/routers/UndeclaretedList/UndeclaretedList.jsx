import {
  useGetUndeclaredPostsQuery,
  useDeclaredPostMutation,
  useGetUndeclaredPostsCountQuery,
  useGetUndeclaredPostQuery,
  useDeleteUndeclaredPostMutation,
} from "../../app/api/apiSlice";
import { createObjectsPage } from "../../creatFunctions/createObjectsPage";

export const UndeclaretedList = () => {
  var [chng] = useDeclaredPostMutation();
  const result = createObjectsPage({
    queryFunction: useGetUndeclaredPostsQuery,
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
    queryPostCount: useGetUndeclaredPostsCountQuery,
    chng: () => [],
    del: useDeleteUndeclaredPostMutation,
    path: "undeclared",
  });

  return <>{result}</>;
};
