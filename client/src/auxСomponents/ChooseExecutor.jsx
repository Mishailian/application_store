export var ChooseExecutor = (chengeState, executor, result) => {
  return (
    <div className="ml-2 justify-self-end">
      {<div onClick={() => chengeState()}>{executor ?? "❌"}</div>}
      {result}
    </div>
  );
};
