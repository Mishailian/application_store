export var unwrapData = (data, component) => {
  data = JSON.parse(data);
  var result = [];
  for (var [key, value] of Object.entries(data)) {
    result.push(component({ data: value }));
  }
  return result;
};
