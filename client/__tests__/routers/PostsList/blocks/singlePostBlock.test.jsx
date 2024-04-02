import { expect, describe, test, vi, it, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import { SinglePostBlock } from "../../../../src/routers/PostsList/blocks/SinglePostBlock";

var mockedFn = vi.fn();

describe("test single post block", () => {
  vi.mock("react", () => {
    return {
      useState: (data) => [{ test: true }, () => {}],
      useEffect: () => {},
    };
  });
  vi.mock("../../../../src/creatFunctions/unwrapData", () => {
    return {
      unwrapData: () => [],
    };
  });

  vi.mock("../../../../src/forms/TasksFields", () => {
    return {
      TasksFields: () => {},
    };
  });

  let props = {
    data: { is_superuser: true, about: '{"test": true}' },

    localState: { 0: {} },
    obj: { handleSubmit: () => {}, handleChange: mockedFn },
  };

  it("test with currect data", () => {
    let comp = render(SinglePostBlock(props));
    expect(comp.queryByTestId("TasksHeader")).toBeInTheDocument();
    expect(comp.queryByTestId("SinglePostBlockForm")).toBeInTheDocument();
  });

  it("test superUser true", () => {
    let comp = render(SinglePostBlock(props));
    expect(comp.queryByTestId("SinglePostBlockSubmite")).toBeInTheDocument();
  });

  it("test superUser false", () => {
    props.data.is_superuser = false;
    let comp = render(SinglePostBlock(props));
    expect(
      comp.queryByTestId("SinglePostBlockSubmite")
    ).not.toBeInTheDocument();
    props.data.is_superuser = true;
  });

  it("test buttons", () => {
    let comp = render(SinglePostBlock(props));
    fireEvent.click(comp.getByTestId("SinglePostBlockSubmite"));
    expect(mockedFn).toHaveBeenCalledOnce();
  });
});
