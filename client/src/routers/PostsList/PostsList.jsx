import { createObjectsPage } from "../../creatFunctions/createObjectsPage";
import { useGetFilterPostsQuery } from "../../app/api/apiSlice";
import { useGetPostsCountQuery } from "../../app/api/apiSlice";
import {
  useChengePostMutation,
  useDeletePostMutation,
} from "../../app/api/apiSlice";

export const PostsList = () => {
  const result = createObjectsPage({
    queryParams: {},
    queryFunction: useGetFilterPostsQuery,
    queryPostCount: useGetPostsCountQuery,
    chng: useChengePostMutation,
    del: useDeletePostMutation,
  });
  return result;
};
