import { useState } from "react";
import { FilterJsx } from "../app/AuxiliaryComponents/FilterJsx";

export const useFilter = (mode) => {
  const [isrevers, setrevers] = useState({ reverse: false });
  const [getfilterAim, setfilterAim] = useState();
  const [getfilter, setfilter] = useState(false);
  const [isOn, setswithcer] = useState({});

  const handleRevers = () => {
    setrevers(!isrevers);
  };
  const handleSwitch = (e) => {
    console.log(e.target);
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

  return {
    filterConfig: {
      isFilter: true,
      filterMetod: "sort",
      filterAim: getfilterAim,
      reverse: isrevers,
    },
    fillter: (
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
