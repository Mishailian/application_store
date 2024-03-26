import { useState } from "react";
import { filterByCondition } from "../../creatFunctions/filterFunctions/filterFunctions";
import { FilterJsx } from "../../app/AuxiliaryComponents/FilterJsx";

export const useFilter = (mode) => {
  const [isrevers, setrevers] = useState({ reverse: false });
  const [getfilterAim, setfilterAim] = useState();
  const [getfilter, setfilter] = useState(false);
  const [isOn, setswithcer] = useState({});

  const handleRevers = () => {
    setrevers(!isrevers);
  };
  const handleSwitch = (e) => {
    const { name, value } = e.target;
    setswithcer(() => ({
      [name]: value === "on" ? null : "on",
    }));
    setfilterAim(() => ({
      [name]: value,
    }));
  };
  const handleFilter = (e) => {
    const { name, value } = e.target;
    setfilter(() => ({
      [name]: value,
    }));
  };

  var filterConfig = {
    isFilter: true,
    filterMetod: "sort",
    filterAim: getfilterAim,
    reverse: isrevers,
  };
  var fillter = (object) => {
    if (object === undefined) return;

    filterConfig.filterAim &&
      (object = filterByCondition(object, Object.keys(filterConfig.filterAim)));

    filterConfig.reverse ? (object = [...object].reverse()) : object;
    return object;
  };

  return {
    fillter,
    fillterJsx: (
      <FilterJsx
        mode={mode}
        isOn={isOn}
        isrevers={isrevers}
        handleSwitch={handleSwitch}
        handleRevers={handleRevers}
        handleFilter={handleFilter}
      />
    ),
  };
};
