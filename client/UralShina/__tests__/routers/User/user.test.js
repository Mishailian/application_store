import { expect, describe, test, vi, it, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import { User } from "../../../src/routers/User/User";

describe("test user", () => {
  vi.mock("../../../src/static/static", () => {
    return {
      getUsersTable: () => ({ 1: "misha", 2: "masha" }),
    };
  });

  it("test with currect data", () => {
    let comp = render(User({ userId: 1 }));
    expect(comp.getByText("misha")).toBeInTheDocument();
  });
});
