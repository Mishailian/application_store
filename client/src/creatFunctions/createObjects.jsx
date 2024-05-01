export const createObjects = (objects, Component, additionalProps = {}) =>
  objects.map((ob) => {
    ob = { ...ob, ...additionalProps };
    return <Component data={ob} key={ob.id} />;
  });
