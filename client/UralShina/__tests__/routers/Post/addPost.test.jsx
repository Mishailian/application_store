import { expect, describe, test, vi, it, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import { AddPost } from "../../../src/routers/Post/AddPost";

var mockedFn = vi.fn();

describe("test add post", () => {
  vi.mock("react", () => {
    return { useEffect: () => {}, useState: () => ["", () => {}] };
  });

  vi.mock("../../../src/hooks/useAddField/useAddField", () => {
    return {
      useAddField: () => ({
        component: <div>test</div>,
        componentData: "",
      }),
    };
  });

  vi.mock("../../../src/static/static", () => {
    return { staticApi: () => ({ structure: {} }) };
  });

  vi.mock("../../../src/app/api/apiSlice", () => {
    return {
      useAddPostMutation: () => [""],
    };
  });

  vi.mock("../../../src/hooks/useInputCheck", () => {
    return {
      useInputCheck: () => ({
        inputData: "",
        setFormData: "",
        handleChange: () => {
          return mockedFn();
        },
        handleSubmit: "",
        setData: "",
      }),
    };
  });

  it("test with currect data", () => {
    let comp = render(AddPost());
    expect(comp.queryByTestId("TasksHeader")).toBeInTheDocument();
    expect(comp.getByText("test")).toBeInTheDocument();
  });

  it("test buttons", () => {
    let comp = render(AddPost());
    expect(comp.getByTestId("AddPostSubmite")).toBeInTheDocument();
    fireEvent.click(comp.queryByTestId("AddPostSubmite"));
    expect(mockedFn).toHaveBeenCalledOnce();
  });
});
