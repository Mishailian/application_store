import { expect, describe, test, vi, it, beforeEach } from "vitest";
import { getPrevObject } from "../../src/hooks/useAddField/getPrevObject";
import { filterField } from "../../src/hooks/useAddField/filterField";
import { fireEvent, render, screen } from "@testing-library/react";
import { useAddField } from "../../src/hooks/useAddField/useAddField";
import { renderHook } from "@testing-library/react";
var mockedSetData = vi.fn();
describe("test add field", () => {
  var obj = {
    formData: {},
  };

  it("getPrevObject test with 0 data", () => {
    expect(getPrevObject()).toBeUndefined();
  });

  it("getPrevObject test if not formData", () => {
    expect(getPrevObject([0], obj)).toBeUndefined();
  });

  it("getPrevObject test with formData ", () => {
    obj.formData[0] = { test: true };
    expect(getPrevObject([0], obj) === obj.formData[0]).toBe(false);
  });

  it("getPrevObject test fromData", () => {
    obj.formData[0] = "test";
    obj.formData[1] = "test";
    obj.formData[2] = "test";
    expect(getPrevObject([0, 1, 2], obj)).toEqual("test");
  });

  it("filterField test with 0 data  ", () => {
    expect(filterField()).toEqual([undefined, undefined]);
  });

  it("filterField test with data without `id` prop in data ", () => {
    expect(filterField(0, [{}, {}], obj)[0]).toEqual([]);
  });

  it("filterField test with data ", () => {
    expect(filterField(0, [{ id: 0 }, { id: 1 }], obj)[0]).toEqual([{ id: 0 }]);
  });

  it("filterField test without formData in obj ", () => {
    expect(filterField(0, [], {})[1]).toEqual(undefined);
  });

  it("filterField test with formData ", () => {
    obj.formData = { 0: 0, 1: 1 };
    expect(filterField(0, [], obj)[1]).toEqual({ 1: 1 });
  });

  it("test addField hook", () => {
    vi.mock("../../src/hooks/useInputCheck", () => {
      return {
        useInputCheck: () => ({
          inputData: { formData: {} },
          handleChenge: vi.fn(),
          setData: mockedSetData,
          resetData: vi.fn(),
        }),
      };
    });

    const { result } = renderHook(() => useAddField({}, <div></div>));
    const { getByText } = render(result.current.component);
    fireEvent.click(getByText("add"));
    fireEvent.click(getByText("add"));
    expect(mockedSetData).toHaveBeenCalledTimes(2);
  });
});
