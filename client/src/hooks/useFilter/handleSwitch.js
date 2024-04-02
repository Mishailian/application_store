export const handleSwitch = (e) => {
  const { name, value } = e.target;
  setswithcer(() => ({
    [name]: value === "on" ? null : "on",
  }));
  setfilterAim(() => ({
    [name]: value,
  }));
};
