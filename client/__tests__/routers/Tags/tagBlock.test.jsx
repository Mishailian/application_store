import { expect, describe, test, vi, it, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import { TagBlock } from "../../../src/routers/Tags/TagBlock";

let mockedHandleSubmit = vi.fn();
let mockedChengeTag = vi.fn();
let mockedDelete = vi.fn();
let mockedSetFormData = vi.fn();

describe("test tag block", () => {
  const mocks = vi.hoisted(() => {
    return {
      hoistedUseState: vi.fn(() => {
        return true;
      }),
    };
  });

  vi.mock("../../../src/app/api/apiSlice", () => {
    return {
      useDeleteTagMutation: () => [mockedDelete],
      useChengeTagMutation: () => [mockedChengeTag()],
    };
  });

  vi.mock("../../../src/hooks/useInputCheck", () => {
    return {
      useInputCheck: () => ({
        inputData: { name: "test" },
        handleChange: null,
        handleSubmit: () => mockedHandleSubmit(),
      }),
    };
  });

  vi.mock("react", () => {
    return {
      useEffect: () => {},
      useState: () => [
        mocks.hoistedUseState(),
        (el) => {
          if (typeof el === "function") mockedSetFormData(el());
          else mockedSetFormData(el);
        },
      ],
    };
  });

  it("test buttons", () => {
    let comp = render(TagBlock({ tag: {} }));
    let button = comp.queryByTestId("TagBlockSubmite");
    fireEvent.click(button);
    expect(mockedHandleSubmit).toHaveBeenCalledOnce();
  });

  it("test hide blocks", () => {
    mocks.hoistedUseState.mockReturnValueOnce(false);
    let comp = render(TagBlock({ tag: {} }));
    expect(comp.queryByTestId("TagBlockSubmite")).not.toBeInTheDocument();
  });

  it("test with currect data", () => {
    let comp = render(TagBlock({ tag: { name: "test" } }));
    expect(comp.getByText("test")).toBeInTheDocument();
  });
});
