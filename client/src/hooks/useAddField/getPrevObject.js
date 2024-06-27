// in lastObject we subtract 2 becouse of for ainmation we create 2 elevents. First el have 0 hieght and second 100% hieght.

export var getPrevObject = (data, formData) => {
  if (formData == undefined) return undefined;
  var lastObject = data.length > 1 ? data.length - 2 : 0;
  // if (data.length > 0) lastObject = data.length - 1;
  var prevData;
  console.log(data);
  if (formData.formData?.[data[lastObject].id]) {
    prevData = structuredClone(formData.formData?.[data[lastObject].id]);
    prevData.isDone = false;
  }
  return prevData;
};
