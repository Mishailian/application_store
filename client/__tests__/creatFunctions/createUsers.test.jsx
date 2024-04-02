import { expect, describe, test, vi, it, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react";

import { createUsers } from "../../src/creatFunctions/createUsers";

var mockUseNavigate = vi.fn((el) => {});

describe("test createUsers function", () => {
  vi.mock("react-router-dom", () => {
    return {
      useNavigate: () => mockUseNavigate,
    };
  });

  vi.mock("../../src/static/static", () => {
    return {
      staticApi: () => {},
      getUsersTable: () => ({
        1: "misha",
        2: "masha",
        3: "kara",
        4: "piba",
      }),
    };
  });

  it("test createUsers", () => {
    let comp = render(createUsers());
    let but = comp.getAllByTestId("user-list-button")[0];
    fireEvent.click(but);
    expect(mockUseNavigate).toHaveBeenCalledOnce();
    expect(mockUseNavigate).toHaveBeenCalledWith("1/", {
      state: { name: "piba" },
    });
  });
});
