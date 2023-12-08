import { useState } from "react";

export const useInputCheck = () => {
  const [inputData, setFormData] = useState({});

  const setData = (formData, data = null) => {
    if (Object.keys(inputData).length === 0) {
      setFormData({ formData });
      if (data) {
        setFormData((initState) => ({
          ...initState,
          additionalData: data,
        }));
      }
    }
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      formData: { ...prevData.formData, [name]: value },
    }));
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

  return { inputData, setFormData, handleChange, handleSubmit, setData };
};
