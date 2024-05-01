import { useFilter } from "../../hooks/useFilter/useFilter";
import {
  useGetPostsQuery,
  useGetPostsCountQuery,
  useChengePostMutation,
  useDeletePostMutation,
} from "../../app/api/apiSlice";
import { createObjects } from "../../creatFunctions/createObjects";
import { progressCheck } from "../../progressCheck";
import { useState } from "react";
import { useSelector } from "react-redux";
import { PostBlock } from "../../auxСomponents/PostBlock";

export const PostsList = () => {
  let [page, setPage] = useState(0);
  // function below need throw in another file

  function cunculetePages(countOfObects) {
    let result = [];
    let countOfPages = Math.ceil(countOfObects / 5);
    for (let i = 0; i < countOfPages; i++) {
      result.push(<button onClick={() => setPage(i)}>{i}</button>);
    }
    return result;
  }
  var [chng] = useChengePostMutation();
  const [del] = useDeletePostMutation();

  const count = useGetPostsCountQuery();
  var usersTable = useSelector((state) => state.users.usersTable);
  console.log(usersTable);
  const { fillterJsx, fillter } = useFilter("PostsPage");
  const objPosts = useGetPostsQuery({ page });

  var callBack = (data) => {
    let obj = fillter(data);
    return createObjects(obj, PostBlock, {
      getUsersTable: usersTable,
      fn: del,
      chenge: chng,
      path: "store",
    });
  };

  const content = progressCheck(objPosts, callBack);
  const pages = progressCheck(count, cunculetePages);
  return (
    <div>
      {fillterJsx}
      {content}
      {pages}
    </div>
  );
};
