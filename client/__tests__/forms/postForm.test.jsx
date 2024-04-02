import { expect, describe, test, vi, it, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { PostForm } from "../../src/forms/PostForm";

describe("test post form", () => {
  it("cheack with currect props", () => {
    let props = {
      name: "test",
      date_create: "2004",
      addStuctures: <div>addStucture</div>,
    };
    let comp = render(PostForm(props));
    expect(comp.queryByText("test")).toBeInTheDocument();
    expect(comp.queryByText("addStucture")).toBeInTheDocument();
  });
});
