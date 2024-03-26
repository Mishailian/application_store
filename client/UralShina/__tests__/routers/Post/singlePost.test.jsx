import { expect, describe, test, vi, it, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import { SinglePost } from "../../../src/routers/Post/SinglePost";

describe("test single post", () => {
  vi.mock("react-redux", () => {
    return { useSelector: () => {} };
  });

  vi.mock("react-router-dom", () => {
    return { useParams: () => ({ postId: "2004" }) };
  });

  vi.mock("../../../src/hooks/useInputCheck", () => {
    return {
      useInputCheck: () => ({
        inputData: "",
        setFormData: "",
        handleChange: "",
        handleSubmit: "",
        setData: "",
      }),
    };
  });

  vi.mock("../../../src/progressCheck", () => {
    return { progressCheck: () => <div>test</div> };
  });

  vi.mock("../../../src/routers/PostsList/blocks/SinglePostBlock", () => {
    return { SinglePostBlock: () => {} };
  });

  vi.mock("../../../src/app/api/apiSlice", () => {
    return {
      useChengePostMutation: () => [""],
      useGetPostQuery: () => ({ data: {} }),
    };
  });

  it("test with currect data", () => {
    let comp = render(SinglePost());
    expect(comp.getByText("test")).toBeInTheDocument();
  });
});
