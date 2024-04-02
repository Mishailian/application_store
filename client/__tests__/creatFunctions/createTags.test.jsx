import { expect, describe, test, vi, it, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import { createTags } from "../../src/creatFunctions/createTags";
import { TagBlock } from "../../src/routers/Tags/TagBlock";

describe("test Create Tags", () => {
  it("createTags test", () => {
    expect(createTags([1])).toEqual([<TagBlock tag={1} />]);
  });
});
