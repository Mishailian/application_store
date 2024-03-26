import { expect, describe, test, vi, it, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import { createObjects } from "../../src/creatFunctions/createPosts";

var mockedFn = vi.fn();
describe("test createPost functions", () => {
  beforeEach(() => {
    mockedFn.mockClear();
  });
  it("test createObjects", () => {
    let arr = [{ id: 1 }, { id: 2 }];
    render(createObjects(arr, mockedFn));
    expect(mockedFn).toHaveBeenCalledTimes(2);
    expect(mockedFn).toHaveBeenCalledWith({ data: { id: 1 } }, {});
    expect(mockedFn).toHaveBeenCalledWith({ data: { id: 2 } }, {});
  });
  it("test createObjects with addtionalProps", () => {
    let arr = [{ id: 1 }];
    render(createObjects(arr, mockedFn, { test: "true" }));
    expect(mockedFn).toHaveBeenCalledTimes(1);
    expect(mockedFn).toHaveBeenCalledWith(
      { data: { id: 1, test: "true" } },
      {}
    );
  });
});
