import { useFilter } from "../../hooks/useFilter/useFilter";
import {
  useGetPostsQuery,
  useGetPostsCountQuery,
} from "../../app/api/apiSlice";
import { createObjects } from "../../creatFunctions/createPosts";
import { progressCheck } from "../../progressCheck";
import { staticApi, useUpdateUsersTable } from "../../static/static";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// короче завтра переписать ВЕСЬ useProgressCheck из за того что ты обастрался и встроил туда фильтр хотя он там быть НЕДОЛЖЕН!! фильтр должен быть врапером или функция обертка и может потом сделать хук который обядинит все тоесть вызов прогрес чека и обертки и вернет результат
export const PostsList = () => {
  let [page, setPage] = useState(0);
  // function below need throw in another file

  var dispatch = useDispatch();
  var updateUsersTable = useUpdateUsersTable();
  function cunculetePages(countOfObects) {
    let result = [];
    let countOfPages = Math.ceil(countOfObects / 5);
    for (let i = 0; i < countOfPages; i++) {
      result.push(<button onClick={() => setPage(i)}>{i}</button>);
    }
    return result;
  }
  const count = useGetPostsCountQuery();
  var s = staticApi();
  var usersTable = useSelector((state) => state.users.usersTable);
  console.log(usersTable);
  const { fillterJsx, fillter } = useFilter("PostsPage");
  const objPosts = useGetPostsQuery({ page: page });
  var callBack = (data) => {
    var obj = fillter(data);
    return createObjects(obj, s.structure.postBlock, {
      getUsersTable: usersTable,
    });
  };
  // let pages = [
  //   ,
  //   <button onClick={() => setPage(0)}>0</button>,
  //   <button onClick={() => setPage(1)}>1</button>,
  // ];
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
