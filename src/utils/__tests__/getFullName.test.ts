import { getFullName } from "../getFullName";
import { mockEmployee } from "../../../testing";

describe("getFullName", () => {
  test("should return fullName", () => {
    expect(getFullName(mockEmployee.Result as never)).toBe("Cormac McCarthy");
  });

  test("should return only FirstName", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(getFullName({ FirstName: { DisplayValue: "Cormac" }})).toBe("Cormac");
  });

  test("should return only LastName", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(getFullName({ LastName: { DisplayValue: "McCarthy" }})).toBe("McCarthy");
  });

  test("shouldn't return fullName", () => {
    expect(getFullName(null)).toBe("-");
  });
});
