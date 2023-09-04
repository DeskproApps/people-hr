import { isAPIError } from "../isAPIError";

describe("isAPIError", () => {
  test("should truthy if response successfully", () => {
    expect(isAPIError({
      isError: true,
      Status: 2,
      Message: "Some error",
      Result: {},
    })).toBeTruthy();
  });

  test("should falsy if if response failure", () => {
    expect(isAPIError({
      isError: false,
      Status: 0,
      Message: "The request processed successfully.",
      Result: { some: "data" },
    })).toBeFalsy();
  });

  test.each([undefined, null, "", 0, true, false, {}])("wrong value: %p", (res) => {
    expect(isAPIError(res as never)).toBeFalsy();
  });
});
