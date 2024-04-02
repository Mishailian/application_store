import { expect, describe, test, vi, it, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import { TagList } from "../../../src/routers/Tags/TagList";

var mockedFn = vi.fn();
describe("test Tag list", () => {
  beforeEach(() => {
    mockedFn.mockClear();
  });

  vi.mock("../../../src/routers/Tags/AddTag", () => {
    return {
      AddTag: () => <div>test</div>,
    };
  });

  vi.mock("../../../src/app/api/apiSlice", () => {
    return { useGetTagsQuery: () => ({}) };
  });

  vi.mock("../../../src/creatFunctions/createTags", () => {
    return { createTags: (e) => mockedFn(e) };
  });

  vi.mock("../../../src/progressCheck", () => {
    return {
      progressCheck: (_, fn) => {
        fn("test");
        return <div>inProgressCheck</div>;
      },
    };
  });
  //   expect(comp.queryByText("test")).toBeInTheDocument();

  it("test buttons", () => {
    render(TagList());
    expect(mockedFn).toHaveBeenCalledOnce();
    expect(mockedFn).toHaveBeenCalledWith("test");
  });

  it("test with currect data", () => {
    let comp = render(TagList());
    expect(comp.queryByText("test")).toBeInTheDocument();
    expect(comp.queryByText("inProgressCheck")).toBeInTheDocument();
  });
});
