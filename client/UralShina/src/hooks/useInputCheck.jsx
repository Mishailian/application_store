import { useState } from "react";

export const useInputCheck = (obj, { callback, erorrMess = "ошибка" }) => {
  const [inputData, setFormData] = useState(obj);
  const [sendForm] = callback();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const { data, error } = await sendForm(inputData);
      const newData = Object.keys(inputData).reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {});
      setFormData(newData);
    } catch {
      console.error(erorrMess);
    }
  };

  return { inputData, handleChange, handleSubmit };
};
