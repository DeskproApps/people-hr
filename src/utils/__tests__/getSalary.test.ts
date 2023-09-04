import { getSalary } from "../getSalary";
import { mockEmployeeSalary } from "../../../testing";

describe("getSalary", () => {
  test("should return salary with currency", () => {
    expect(getSalary(mockEmployeeSalary.Result[0] as never)).toEqual("£ 250000");
  });

  test("shouldn't return salary", () => {
    expect(getSalary()).toEqual("-");
  });
});
