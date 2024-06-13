import { useState } from "react";

export var ChooseBlock = (obj = {}, callback) => {
  var [isClose, setClose] = useState(true);
  var result;
  var choseTable = Object.entries(obj).map((data) => {
    var id = data[0];
    var name = data[1];
    return (
      <div
        className="cursor-pointer"
        onClick={() => {
          setClose(true);
          callback(id);
        }}
      >
        {name}
      </div>
    );
  });

  result = isClose ? (
    <div data-testid="unVisibleBlock"></div>
  ) : (
    <div data-testid="visibleBlock" className="choseExecutor">
      {...choseTable}
    </div>
  );
  var chengeState = (state) => {
    if (state) setClose(state);
    else setClose(!isClose);
  };
  return { result, chengeState };
};
