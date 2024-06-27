import { useParams } from "react-router-dom";
import { createObjectsPage } from "../../creatFunctions/createObjectsPage";
import {
  useChengePostMutation,
  useGetFilterPostsQuery,
  useDeletePostMutation,
} from "../../app/api/apiSlice";
import { useGetPostsFilteredCountQuery } from "../../app/api/apiSlice";

export const UserPage = () => {
  const { userId } = useParams("userId");
  const result = createObjectsPage({
    queryParams: { ex_i: userId },
    queryFunction: useGetFilterPostsQuery,
    alternativeView: () => <h2>👦</h2>,
    queryPostCount: useGetPostsFilteredCountQuery,
    chng: useChengePostMutation,
    del: useDeletePostMutation,
  });

  return <>{result}</>;
};
