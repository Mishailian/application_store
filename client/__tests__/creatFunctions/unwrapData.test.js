import { expect, describe, test, vi, it, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import { unwrapData } from "../../src/creatFunctions/unwrapData";

var mokedFn = vi.fn();
describe("test unwrap data function", () => {
  it("put correct data ", () => {
    let someData = '{"test": "true"}';
    let addData = { addData: "true" };
    unwrapData(someData, mokedFn, addData);
    expect(mokedFn).toHaveBeenCalledOnce();
    expect(mokedFn).toHaveBeenCalledWith({
      data: "true",
      additionalData: { addData: "true" },
    });
  });
});
