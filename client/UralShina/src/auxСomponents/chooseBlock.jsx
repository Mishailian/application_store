import { useState } from "react";

export var chooseBlock = (obj = {}, callback) => {
  var [isClose, setClose] = useState(true);
  var result;
  result = Object.entries(obj).map((data) => {
    var id = data[0];
    var name = data[1];
    return <div onClick={() => callback(id)}>{name}</div>;
  });

  isClose
    ? (result = <></>)
    : (result = (
        <div
          style={{
            with: "100px",
            height: "100px",
            backgroundColor: "lightblue",
            marginTop: "10px",
          }}
        >
          {...result}
        </div>
      ));
  var chengeState = () => setClose(!isClose);
  return { result, chengeState };
};
