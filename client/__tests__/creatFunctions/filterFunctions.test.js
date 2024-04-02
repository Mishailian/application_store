import { expect, describe, test, vi, it, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import {
  filterByCondition,
  filterByConditions,
} from "../../src/creatFunctions/filterFunctions/filterFunctions";

describe("test filter functions", () => {
  it("test filterByConditions", () => {
    let item = { addTest: false, test: "true" };
    let condition = { addTest: false, test: "true" };
    expect(filterByConditions(item, condition)).toEqual(true);
  });
  it("test filterByCondition", () => {
    let post = [{ id: "2" }, { id: "1" }];
    let condition = "id";
    expect(filterByCondition(post, condition)).toEqual([
      { id: "1" },
      { id: "2" },
    ]);
  });
});
