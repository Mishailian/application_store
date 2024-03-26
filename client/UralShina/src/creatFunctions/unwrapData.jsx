export var unwrapData = (data, component, additionalData) => {
  data = JSON.parse(data);
  var result = [];
  for (var [_, value] of Object.entries(data)) {
    result.push(component({ data: value, additionalData }));
  }

  return result;
};
