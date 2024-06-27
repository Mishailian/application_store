import { useFilter } from "../hooks/useFilter/useFilter";
import {
  useChengePostMutation,
  useDeletePostMutation,
} from "../app/api/apiSlice";
import { createObjects } from "./createObjects";
import { progressCheck } from "../progressCheck";
import { createPaginationControl } from "./createPaginationControl";
import { useSelector } from "react-redux";
import { PostBlock } from "../auxСomponents/PostBlock";

export const createObjectsPage = (props) => {
  // function below need throw in another file
  const { currentPage, PaginationControl } = createPaginationControl({
    queryFn: props.queryPostCount,
    queryParams: props.queryParams,
  });
  var [chng] = props.chng();
  const [del] = props.del();
  var usersTable = useSelector((state) => state.users.usersTable);
  const { fillterJsx, fillter } = useFilter();
  const objPosts = props.queryFunction({
    ...props.queryParams,
    page: currentPage,
  });

  var callBack = (data) => {
    let obj = fillter(data);
    return createObjects(obj, PostBlock, {
      getUsersTable: usersTable,
      fn: del,
      alternativeView: props.alternativeView,
      chenge: chng,
      path: props.path ?? "store",
    });
  };

  const content = progressCheck(objPosts, callBack);
  return (
    <div className="grid grid-rows-12 grid-cols-6 gap-4 grid-flow-row-dense min-h-full max-h-full p-16">
      {/* <div className="row-start-1 col-start-1 col-end-7  row-end-2 flex flex-row justify-center gap-2">
        <button className="w-1/12 p-1">{"<"}</button>
        <div className="bg-colarC w-2/12 rounded-xl"></div>
        <div className="bg-white w-2/12 rounded-xl"></div>
        <div className="bg-blueC w-2/12 rounded-xl"></div>
        <div className="bg-brownC w-2/12 rounded-xl"></div>
        <button className="w-1/12">{">"}</button>
      </div> */}
      {fillterJsx}
      <div className="col-start-1 col-end-6 row-start-1 row-end-12 grid grid-rows-16 grid-cols-4 gap-4 grid-flow-row-dense min-h-full max-h-full justify-items-center">
        {content}
      </div>
      <div className="col-start-3 col-end-4 row-start-12 col-span-1 flex justify-center items-center">
        {PaginationControl}
      </div>
    </div>
  );
};
