import { useState, useEffect, useSyncExternalStore } from "react";
import { useInputCheck } from "./useInputCheck";
// {`position${count}`: {
//    title: '',
//    p: '',
//    units: '',
//    quantity: x,
//    deadline: 00.00.0000,
//    actualDeadline: 00.00.0000,
//  }}
export const useAddField = (fieldStructure, Component) => {
  var [data, setLocalData] = useState([]);
  var {
    inputData: formData,
    handleChange,
    setData,
    resetData,
  } = useInputCheck();
  var prevObject = () => {
    var lastObject = 0;
    if (data.length > 0) lastObject = data.length - 1;

    var prevData;
    if (formData.formData?.[lastObject])
      prevData = structuredClone(formData.formData?.[lastObject]);

    return prevData;
  };
  var deleteField = (id) => {
    var obj = data.filter((ob) => {
      if (ob.id === id) {
        return false;
      }
      return ob;
    });
    var newObj = Object.fromEntries(
      Object.entries(formData.formData).filter(([key, value]) => key != id)
    );
    resetData();
    setData({ ...newObj }, null, true);
    setLocalData(obj);
  };
  var addField = () => {
    var obj = prevObject();
    var lastId = data[data.length - 1]?.id ?? -1;
    setData(
      { ...formData?.formData, [lastId + 1]: obj ?? fieldStructure },
      null,
      true
    );
    setLocalData([...data, { id: lastId + 1 }]);
  };
  var checkInputs = () => {
    var corectIndex = data.length - 1;
    corectIndex >= 0
      ? console.log(Object.keys(formData.formData?.[corectIndex]))
      : null;
  };
  var chenge = (data, addData) => {
    handleChange(data, addData);
  };
  var result = data.map((ob) => (
    <div>
      <Component
        chenge={chenge}
        del={deleteField}
        data={formData}
        name={ob.id}
      />
    </div>
  ));
  return [...result, <button onClick={() => addField()}>add</button>];
};
