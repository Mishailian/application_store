import { expect, describe, test, vi, it, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { UserList } from "../../../src/routers/UserList/UserList";

var mockedUseNavigate = vi.fn();
describe("user list", () => {
  vi.mock("react-router-dom", () => ({
    ...vi.importActual("react-router-dom"),
    useNavigate: () => mockedUseNavigate,
  }));
  vi.mock("../../../src/creatFunctions/createUsers", async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      // your mocked methods
    };
  });
  vi.mock("../../../src/static/static", () => {
    return {
      getUsersTable: () => ({
        1: "misha",
        2: "masha",
        3: "kara",
        4: "piba",
      }),
      staticApi: () => {
        paths: {
          users: "/users/";
        }
      },
    };
  });

  it("user list length test", () => {
    render(<UserList />);
    expect(screen.getAllByTestId("user-name-conteiner").length).toBe(4);
  });

  it("user list users test", () => {
    render(<UserList />);
    expect(
      screen.getAllByTestId("user-name-conteiner").map((li) => li.textContent)
    ).toEqual(["misha", "masha", "kara", "piba"]);
  });

  it("button check", () => {
    render(<UserList />);
    fireEvent.click(screen.getAllByTestId("user-list-button")[0]);
    expect(mockedUseNavigate).toHaveBeenCalledOnce();
  });
});
