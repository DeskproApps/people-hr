import { getStoreValueByCondition } from "../useFind";

const store = {
  employees: {
    Result: [
      { EmployeeId: "PW1", EmailId: { DisplayValue: "davidtestacc0401@gmail.com" }},
      { EmployeeId: "PW2", EmailId: { DisplayValue: "david.anjonrin@deskpro.com" }},
      { EmployeeId: "PW3", EmailId: { DisplayValue: "cormac.mccarthy@example.org" }},
    ],
  },
  employeesArray: [
    { EmployeeId: "PW4", EmailId: { DisplayValue: "luis.gus@company.com" }},
    { EmployeeId: "PW5", EmailId: { DisplayValue: "xzpawnx@gmail.com" }},
  ],
  userPrimaryEmail: "beatty.irving@example.org",
  userEmails: ["beatty.irving@example.org"],
  user: {
    primary_email: "armen.tamzarian@me.com",
    emails: ["taras.shevchenko@me.urk", "lasia.ukrainka@me.urk"],
  },
};

describe("useFind", () => {
  describe("getStoreValueByCondition", () => {
    test("array | storeKey string", () => {
      const operand2 = { type: "array", storeKey: "employeesArray", storePath: ["EmailId", "DisplayValue"] };
      expect(getStoreValueByCondition(store, operand2 as never)).toStrictEqual([
        { EmployeeId: "PW4", EmailId: { DisplayValue: "luis.gus@company.com" }},
        { EmployeeId: "PW5", EmailId: { DisplayValue: "xzpawnx@gmail.com" }},
      ]);
    });

    test("array | storeKey array", () => {
      const operand = { type: "array", storeKey: ["employees", "Result"], storePath: ["EmailId", "DisplayValue"] };
      expect(getStoreValueByCondition(store, operand as never)).toStrictEqual([
        { EmployeeId: "PW1", EmailId: { DisplayValue: "davidtestacc0401@gmail.com" }},
        { EmployeeId: "PW2", EmailId: { DisplayValue: "david.anjonrin@deskpro.com" }},
        { EmployeeId: "PW3", EmailId: { DisplayValue: "cormac.mccarthy@example.org" }},
      ]);
    });

    test("array | storeKey string | storePath empty", () => {
      const operand = { type: "array", storeKey: "userEmails"};
      expect(getStoreValueByCondition(store, operand as never))
        .toStrictEqual(["beatty.irving@example.org"]);
    });

    test("object | storeKey string | storePath empty", () => {
      const operand = { type: "object", storeKey: "userPrimaryEmail" };
      expect(getStoreValueByCondition(store, operand as never)).toEqual("beatty.irving@example.org");
    });

    test("object | storeKey string | storePath array", () => {
      const operand = { type: "object", storeKey: "user", storePath: ["primary_email"] };
      expect(getStoreValueByCondition(store, operand as never)).toStrictEqual("armen.tamzarian@me.com");
    });

    test("object | storeKey array | storePath empty", () => {
      const operand = { type: "object", storeKey: ["user", "primary_email"] };
      expect(getStoreValueByCondition(store, operand as never)).toStrictEqual("armen.tamzarian@me.com");
    });

    test("object | storeKey array | storePath array", () => {
      const operand = { type: "object", storeKey: ["user", "emails"], storePath: [1] };
      expect(getStoreValueByCondition(store, operand as never)).toStrictEqual("lasia.ukrainka@me.urk");
    });
  });
});
