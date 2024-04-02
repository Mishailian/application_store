export const progressCheck = (
  data,
  callBack = null,
  errorMessege = "error"
) => {
  let content;
  if (data.isLoading) {
    content = <div data-testid="loading-testid">loding</div>;
  } else if (data.isSuccess) {
    content =
      typeof callBack === "function"
        ? callBack(data.data)
        : console.error("callBack is not a function!");
  } else if (data.isError) {
    content =
      typeof errorMessege === "function" ? errorMessege() : errorMessege;
  }

  return content;
};
