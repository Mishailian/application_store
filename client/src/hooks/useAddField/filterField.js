export var filterField = (id, data, formData) => {
  if (id == undefined) return [undefined, undefined];
  var filteredObj;
  var filteredArray = data.filter((ob) => ob.id != id);

  try {
    filteredObj = Object.fromEntries(
      Object.entries(formData.formData).filter(([key, _]) => key != id)
    );
  } catch (e) {
    console.error(e);
  }
  console.log({ formData: filteredObj });
  return [filteredArray, { formData: filteredObj }];
};
