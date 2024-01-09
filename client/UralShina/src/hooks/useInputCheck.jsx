import { useState } from "react";

export const useInputCheck = () => {
  const [inputData, setFormData] = useState({});

  const setData = (formData, data = null, canRepeat = false) => {
    if (Object.keys(inputData).length === 0 || canRepeat) {
      setFormData({ formData });
      if (formData) {
        setFormData((initState) => ({
          ...initState,
          additionalData: data,
        }));
      }
    }
  };
  var resetData = () => {
    setFormData({});
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

    if (addStructure !== null) {
      setFormData((prevData) => ({
        ...prevData,
        formData: {
          ...prevData.formData,
          [addStructure]: {
            ...prevData.formData?.[addStructure],
            [name]: value,
          },
        },
      }));
    } else {
      console.log(name, value);
      setFormData((prevData) => ({
        ...prevData,
        formData: { ...prevData.formData, [name]: value },
      }));
    }
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
