import { useState } from "react";
import { useGetPostsQuery } from "../../app/api/apiSlice";
import { createPosts } from "../../creatFunctions/createPosts";
import { useFilter } from "../../hooks/useFilter";
import { useProgressCheck } from "../../hooks/useProgressCheck";

export const PostsList = () => {
  const { filterConfig, fillter } = useFilter("PostsPage");
  // const fillter = useFilter("PostsPage");

  const objPosts = useGetPostsQuery();
  console.log(filterConfig);
  const content = useProgressCheck(objPosts, {
    callBack: createPosts,
    fillter: { ...filterConfig },
  });
  return (
    <div>
      <div>{content}</div>
      {fillter}
    </div>
  );
};
