import { expect, describe, test, vi, it, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import { useDeclaredPostMutation } from "../../../../src/app/api/apiSlice";
import { UndeclaretedPostBlock } from "../../../../src/routers/UndeclaretedList/blocks/UndeclaretedPostBlock";

var mockedDeclaredPost = vi.fn();

describe("test undeclareted post block", () => {
  beforeEach(() => {
    mockedDeclaredPost.mockClear();
  });

  vi.mock("../../../../src/app/api/apiSlice", () => {
    return {
      useDeclaredPostMutation: () => [mockedDeclaredPost],
    };
  });

  vi.mock("../../../../src/static/static", () => {
    return {
      staticApi: () => ({
        structure: {
          undeclaretedPostsBlock: (fn) => {
            fn();
          },
        },
      }),
    };
  });

  let props = { data: { name: "test" } };

  it("test with currect data", () => {
    let comp = render(UndeclaretedPostBlock(props));
    expect(comp.queryByTestId("PostForm")).toBeInTheDocument();
    expect(comp.queryByText("test")).toBeInTheDocument();
  });

  it("test button", () => {
    render(UndeclaretedPostBlock(props));
    expect(mockedDeclaredPost).toHaveBeenCalledOnce();
  });
});
