export var getPrevObject = (data, formData) => {
  if (formData == undefined) return undefined;
  var lastObject = data.length > 0 ? data.length - 1 : 0;
  // if (data.length > 0) lastObject = data.length - 1;
  var prevData;
  if (formData.formData?.[lastObject])
    prevData = structuredClone(formData.formData?.[lastObject]);
  return prevData;
};
