export var ChooseExecutor = (chengeState, executor, result) => {
  return (
    <div className="ml-2">
      <div className="text-info">
        {<div onClick={() => chengeState()}>{executor ?? "❌"}</div>}
      </div>
      {result}
    </div>
  );
};
