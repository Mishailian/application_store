import { useState } from "react";

export const useInputCheck = () => {
  const [inputData, setFormData] = useState({});

  const setData = (formData, data = null, canRepeat = false) => {
    if (Object.keys(inputData).length === 0 || canRepeat) {
      var obj = { formData };
      if (data) {
        obj.additionalData = data;
      }
      setFormData(obj);
      return formData;
    }
  };
  var resetData = () => {
    return setFormData({});
  };

  const clearInput = () => {
    const newData = Object.keys(inputData.formData).reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {});
    setFormData((initState) => ({
      ...initState,
      formData: newData,
    }));
  };

  const handleChange = (e, addStructure = null) => {
    var name = e?.target?.name ?? Object.keys(e)[0];
    var value = e?.target?.value ?? Object.values(e)[0];
    var obj = {
      ...inputData,
      formData: { ...inputData?.formData },
    };

    if (addStructure !== null)
      obj.formData = {
        ...inputData.formData,
        [addStructure]: {
          ...inputData.formData?.[addStructure],
          [name]: value,
        },
      };
    else {
      obj.formData = { ...obj.formData, [name]: value };
    }
    setFormData(obj);
  };

  const handleSubmit = async (callback) => {
    debugger;
    try {
      let resultData;
      if (inputData.additionalData !== undefined)
        resultData = {
          ...inputData.additionalData,
          initialState: inputData.formData,
        };
      else {
        resultData = { initialState: { ...inputData.formData } };
      }
      await callback(resultData);
      clearInput();
    } catch {
      console.error("erorrr");
    }
  };

  return {
    inputData,
    setFormData,
    handleChange,
    handleSubmit,
    setData,
    resetData,
  };
};
