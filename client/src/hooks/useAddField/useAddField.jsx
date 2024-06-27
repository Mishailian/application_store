import { filterField } from "./filterField";
import { getPrevObject } from "./getPrevObject";
import { useState } from "react";
import { useInputCheck } from "../useInputCheck";
// {`position${count}`: {
//    title: '',
//    p: '',
//    units: '',
//    quantity: x,
//    deadline: 00.00.0000,
//    actualDeadline: 00.00.0000,
//  }}

/*
data is counter of objects 
formData is a list of current objects

whem addField is called, at first get current able id from data and update then, second push new object to formData with new id

when deleteField is called, i dont know whats going on)
*/

export const useAddField = (fieldStructure, Component) => {
  let result = [];
  let vis;
  let delleteClass;
  var [data, setLocalData] = useState([{ id: 0 }]);
  var [delleteId, setdelleteId] = useState(null);
  var [isRepeat, setRepeat] = useState(false);
  var { inputData: formData, handleChange, setData } = useInputCheck();

  setData({ [data[data.length - 1].id]: fieldStructure });

  var deleteField = (id) => {
    setdelleteId(id);
    setTimeout(() => {
      var [obj, newFormData] = filterField(id, data, formData);
      setData({ ...newFormData?.formData }, null, true);
      setLocalData(() => obj);
      setdelleteId(null);
    }, 100);
  };

  var addField = () => {
    var obj = isRepeat ? getPrevObject(data, formData) : undefined;
    var lastId = data[data.length - 1]?.id ?? -1;
    var currentData = obj ?? fieldStructure;
    setData(
      {
        ...formData?.formData,
        [lastId]: { ...currentData, isDone: true },
        [lastId + 1]: currentData,
      },
      null,
      true
    );
    setLocalData([...data, { id: lastId + 1 }]);
  };
  for (let ob = data.length - 1; ob >= 0; ob -= 1) {
    if (delleteId == [data[ob].id]) {
      delleteClass = "h-0 overflow-hidden";
    }

    vis = formData?.formData?.[data[ob].id]?.isDone
      ? "h-9"
      : "h-0 overflow-hidden";
    result.push(
      // <div className={`addComp transition-all mb-2 ${vis}`} key={data[ob].id}>
      <div
        className={`addComp transition-all mb-2 ${delleteClass ?? vis}`}
        key={data[ob].id}
      >
        <Component
          chenge={handleChange}
          eventFunc={deleteField}
          eventFuncName={"-"}
          data={formData.formData}
          name={data[ob].id}
        />
      </div>
    );
    delleteClass = undefined;
  }
  return {
    repeatControll: (
      <div className="p-5 flex flex-col justify-center items-center ">
        <label>повторять</label>
        <input
          type="checkbox"
          role="switch"
          className="custom-checkbox"
          onClick={() => setRepeat(!isRepeat)}
        />
      </div>
    ),
    component: result,
    componentData: formData,
    addField: addField,
  };
};
