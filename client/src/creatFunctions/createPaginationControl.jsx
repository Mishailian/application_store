import { useState } from "react";

export const createPaginationControl = (props) => {
  let [currentPage, setPage] = useState(0);
  const countOfObects = props.queryFn(props.queryParams?.ex_i);
  let result = [];
  let countOfPages = Math.ceil(countOfObects.currentData / 14);
  console.log(countOfPages);
  for (let i = 0; i < countOfPages; i++) {
    result.push(
      <div
        className="inline-block m-1 cursor-pointer h-6 w-4 text-center rounded-md shadow-lg hover:shadow-xl bg-white"
        onClick={() => setPage(i)}
      >
        {i}
      </div>
    );
  }
  return {
    PaginationControl: (
      <div className="col-start-3 col-end-4 row-start-12">{result}</div>
    ),
    currentPage,
  };
};
