import { expect, describe, test, vi, it, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { TasksHeader } from "../../src/forms/TasksHeader";

describe("test Tasks headers", () => {
  it("cheack with currect props", () => {
    let comp = render(TasksHeader());
    expect(comp.queryByText("Еденица измерения")).toBeInTheDocument();
    expect(comp.queryByText("Планируемый срок")).toBeInTheDocument();
  });
});
