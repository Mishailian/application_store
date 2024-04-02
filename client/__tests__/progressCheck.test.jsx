import { progressCheck } from "../src/progressCheck";
import { expect, describe, test, vi, it, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

var testCallBack = () => true;
var loadingTestQuery = {
  isLoading: true,
  isSuccess: false,
  isError: false,
};
var isSuccessTestQuery = {
  isLoading: false,
  isSuccess: true,
  isError: false,
};
var isErrorTestQuery = { isLoading: false, isSuccess: false, isError: true };

describe("progresCheck test", () => {
  it("loading test", () => {
    render(progressCheck(loadingTestQuery, { callBack: testCallBack }));
    expect(screen.getByTestId("loading-testid")).toHaveTextContent("loding");
  });

  it("isSuccess test", () => {
    expect(progressCheck(isSuccessTestQuery, testCallBack)).toBe(true);
  });

  it("isSuccess without callBack test", () => {
    expect(progressCheck(isSuccessTestQuery, {})).toBeUndefined();
  });

  it("isError basic test", () => {
    expect(progressCheck(isErrorTestQuery, { callBack: testCallBack })).toBe(
      "error"
    );
  });

  it("isError function test", () => {
    expect(
      progressCheck(isErrorTestQuery, testCallBack, () => "function error")
    ).toBe("function error");
  });
});
