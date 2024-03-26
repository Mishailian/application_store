import { expect, describe, test, vi, it, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import { AddUser } from "../../../src/routers/User/AddUser";

describe("test add user component", () => {
  it("test with currect data", () => {
    let comp = render(AddUser());
    expect(comp.queryByTestId("AddUserLastName")).toBeInTheDocument();
  });
});
