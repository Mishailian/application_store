export const filterByConditions = (item, conditions) =>
  Object.keys(conditions).every((key) => item[key] === conditions[key]);

export const filterByCondition = (posts, condition) =>
  [...posts].sort((a, b) => a[condition].localeCompare(b[condition]));
