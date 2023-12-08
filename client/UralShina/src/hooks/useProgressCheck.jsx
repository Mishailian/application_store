export const useProgressCheck = (
  data,
  { errorMessege = "error", callBack = null, fillter = null }
) => {
  let content;
  if (data.isLoading) {
    content = <div>loding</div>;
  } else if (data.isSuccess) {
    content =
      typeof callBack === "function" ? callBack(data.data, fillter) : data.data;
  } else if (data.isError) {
    content =
      typeof errorMessege === "function" ? errorMessege() : errorMessege;
  }

  return content;
};
