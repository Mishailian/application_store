import { expect, describe, test, vi, it, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { TasksFields } from "../../src/forms/TasksFields";

describe("test Tasks fields", () => {
  it("cheack with currect props", () => {
    let props = {
      data: {
        title: "test",
        units: "12",
        deadline: new Date(),
      },
    };
    let comp = render(TasksFields(props));
    expect(comp.queryByDisplayValue("test")).toBeInTheDocument();
    expect(comp.queryByDisplayValue("12")).toBeInTheDocument();
  });
});
