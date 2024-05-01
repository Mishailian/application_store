import { filterField } from "./filterField";
import { getPrevObject } from "./getPrevObject";
import { useState, useEffect } from "react";
import { useInputCheck } from "../useInputCheck";
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

  var deleteField = () => {
    var [obj, newObj] = filterField(id, data, formData);
    resetData();
    setData({ ...newObj }, null, true);
    setLocalData(obj);
  };

  var addField = () => {
    var obj = getPrevObject(data, formData);
    console.log(formData);
    var lastId = data[data.length - 1]?.id ?? -1;
    setData(
      { ...formData?.formData, [lastId + 1]: obj ?? fieldStructure },
      null,
      true
    );
    setLocalData([...data, { id: lastId + 1 }]);
  };

  // var checkInputs = () => {
  //   var corectIndex = data.length - 1;
  //   corectIndex >= 0
  //     ? console.log(Object.keys(formData.formData?.[corectIndex]))
  //     : null;
  // };

  var result = data.map((ob) => (
    <div>
      <Component
        chenge={handleChange}
        eventFunc={deleteField}
        eventFuncName={"del"}
        data={formData.formData}
        name={ob.id}
      />
    </div>
  ));
  return {
    component: [...result, <button onClick={() => addField()}>add</button>],
    componentData: formData,
  };
};
