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
    let countOfPages = Math.ceil(countOfObects / 14);
    for (let i = 0; i < countOfPages; i++) {
      result.push(<button onClick={() => setPage(i)}>{i}</button>);
    }
    return <div className="col-start-3 col-end-4 row-start-12">{result}</div>;
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
    <div className="grid grid-rows-12 grid-cols-6 gap-4 grid-flow-row-dense min-h-full max-h-full p-16">
      <div className="row-start-1 col-start-1 col-end-7  row-end-2 flex flex-row justify-center gap-2">
        <button className="w-1/12 p-1">{"<"}</button>
        <div className="bg-colarC w-2/12 rounded-xl"></div>
        <div className="bg-white w-2/12 rounded-xl"></div>
        <div className="bg-blueC w-2/12 rounded-xl"></div>
        <div className="bg-brownC w-2/12 rounded-xl"></div>
        <button className="w-1/12">{">"}</button>
      </div>
      {fillterJsx}
      <div className="col-start-1 col-end-6 row-start-2 row-end-12 grid grid-rows-16 grid-cols-4 gap-4 grid-flow-row-dense min-h-full max-h-full justify-items-center">
        {content}
      </div>
      {pages}
    </div>
  );
};
