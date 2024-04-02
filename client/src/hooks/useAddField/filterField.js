export var filterField = (id, data, formData) => {
  // var obj = data.filter((ob) => {
  //   if (ob.id === id) {
  //     return false;
  //   }
  //   return ob;
  // });
  if (id == undefined) return [undefined, undefined];
  var filteredObj;
  var filteredArray = data.filter((ob) => ob.id === id);

  try {
    filteredObj = Object.fromEntries(
      Object.entries(formData.formData).filter(([key, _]) => key != id)
    );
  } catch (e) {
    console.error(e);
  }
  return [filteredArray, filteredObj];
  //   resetData();
  //   setData({ ...newObj }, null, true);
  //   setLocalData(obj);
};
