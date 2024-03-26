import { expect, describe, test, vi, it, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import { AddTag } from "../../../src/routers/Tags/AddTag";

var mockedAddTag = vi.fn();
var mockedHandleSubmit = vi.fn();

describe("test add tag", () => {
  vi.mock("../../../src/app/api/apiSlice", () => {
    return {
      useAddTagMutation: () => [mockedAddTag],
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

  it("test buttons", () => {
    let comp = render(AddTag());
    let button = comp.queryByTestId("AddTagButton");
    fireEvent.click(button);
    expect(mockedHandleSubmit).toHaveBeenCalledOnce();
  });

  it("test document", () => {
    let comp = render(AddTag());
    expect(comp.queryByTestId("AddTag")).toBeInTheDocument();
    expect(comp.queryByDisplayValue("test")).toBeInTheDocument();
  });
});
