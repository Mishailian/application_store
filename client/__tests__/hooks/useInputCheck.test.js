import { expect, describe, test, vi, it, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import { useInputCheck } from "../../src/hooks/useInputCheck";

const mockedSetFormData = vi.fn();
const mockedFormData = vi.fn();
const mockedCallback = vi.fn();

// const {
//   inputData,
//   setFormData,
//   handleChange,
//   handleSubmit,
//   setData,
//   resetData,
// } = useInputCheck();

describe("test useInputCheck", () => {
  beforeEach(() => {
    mockedSetFormData.mockClear();
    mockedFormData.mockClear();
  });

  const mocks = vi.hoisted(() => {
    return {
      hoistedUseStater: vi.fn((el) => {
        mockedSetFormData(el);
      }),
      hoistedUseState: vi.fn(() => {
        return {};
      }),
    };
  });

  vi.mock("react", () => {
    return {
      useState: () => [
        // () => {
        //   mockedFormData();
        //   return {};
        // },
        mocks.hoistedUseState(),
        (el) => {
          if (typeof el === "function") mockedSetFormData(el());
          else mockedSetFormData(el);
        },
      ],
    };
  });

  it("test setData with formData only ", () => {
    const { setData } = useInputCheck();
    setData({ test: true });
    expect(mockedSetFormData).toHaveBeenCalledWith({
      formData: { test: true },
    });
    expect(mockedSetFormData).toHaveBeenCalledOnce();
  });

  it("test setData with formData and data ", () => {
    const { setData } = useInputCheck();

    setData({ test: true }, { addData: true });
    expect(mockedSetFormData).toHaveBeenCalledWith({
      formData: { test: true },
      additionalData: { addData: true },
    });
    expect(mockedSetFormData).toHaveBeenCalledOnce();
  });

  it("test setData call 2 times ", () => {
    mocks.hoistedUseState.mockReturnValue({ 1: 1 });
    const { setData } = useInputCheck();
    setData({ test: true });
    setData({ test: false });
    expect(mockedSetFormData).toHaveBeenCalledTimes(0);
  });

  it("test setData call 2 times with repaet ", () => {
    mocks.hoistedUseState.mockReturnValueOnce({ 1: 1 });
    const { setData } = useInputCheck();
    setData({ test: true }, null, true);
    setData({ test: false }, null, true);
    expect(mockedSetFormData).toHaveBeenCalledTimes(2);
  });

  it("test resetData", () => {
    const { resetData } = useInputCheck();
    resetData();
    expect(mockedSetFormData).toHaveBeenCalledWith({});
    expect(mockedSetFormData).toHaveBeenCalledOnce();
  });

  it("test handleChange", () => {
    mocks.hoistedUseState.mockReturnValueOnce({ 1: 2 });
    const { handleChange } = useInputCheck();
    const e = { e: { target: { name: "test", value: "true" } } };
    handleChange(e);
    expect(mockedSetFormData).toHaveBeenCalledWith({
      1: 2,
      formData: { e: { target: { name: "test", value: "true" } } },
    });
  });

  it("test handleChange", () => {
    mocks.hoistedUseState.mockReturnValueOnce({ 1: 2 });
    const { handleChange } = useInputCheck();
    const e = { test: "true" };
    handleChange(e);
    expect(mockedSetFormData).toHaveBeenCalledWith({
      1: 2,
      formData: { test: "true" },
    });
  });

  it("test handleChange with out e ", () => {
    mocks.hoistedUseState.mockReturnValueOnce({ 1: 2 });
    const { handleChange } = useInputCheck();
    const e = { test: "true" };
    handleChange(e);
    expect(mockedSetFormData).toHaveBeenCalledWith({
      1: 2,
      formData: { test: "true" },
    });
  });

  it("test handleChange with addStructure", () => {
    mocks.hoistedUseState.mockReturnValueOnce({ 1: 2 });
    const { handleChange } = useInputCheck();
    const e = { test: "true" };
    handleChange(e, "addStructure");
    expect(mockedSetFormData).toHaveBeenCalledWith({
      1: 2,
      formData: { addStructure: { test: "true" } },
    });
  });

  it("test handleSubmit ", () => {
    mocks.hoistedUseState.mockReturnValueOnce({ formData: { test: "true" } });
    const { handleSubmit } = useInputCheck();
    handleSubmit(mockedCallback);
    expect(mockedCallback).toHaveBeenCalledWith({
      initialState: { test: "true" },
    });
  });

  it("test handleSubmit ", () => {
    mocks.hoistedUseState.mockReturnValueOnce({
      additionalData: { addStructure: "true" },
      formData: { test: "true" },
    });
    const { handleSubmit } = useInputCheck();
    handleSubmit(mockedCallback);
    expect(mockedCallback).toHaveBeenCalledWith({
      addStructure: "true",
      initialState: { test: "true" },
    });
  });

  it("test clearInput", () => {
    mocks.hoistedUseState.mockReturnValueOnce({ formData: { test: "true" } });
    const { clearInput } = useInputCheck();
    clearInput();
    expect(mockedSetFormData).toHaveBeenCalledWith({ formData: { test: "" } });
  });
});
