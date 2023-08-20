const employee = {
  path: "/employee/:employeeId",
  page: {
    store: {
      employee: {
        source: "#api",
        url: "#mock/mockEmployee"
      },
      salary: {
        source: "#api",
        url: "#mock/mockEmployeeSalary"
      },
    },
    blocks: {
      name: {
        type: "fullName",
        pathInStore: ["employee", "Result"],
      },
      email: {
        type: "text",
        label: "Email address",
        pathInStore: ["employee", "Result", "EmailId", "DisplayValue"],
      },
      department: {
        type: "text",
        label: "Department",
        pathInStore: ["employee", "Result", "Department", "DisplayValue"],
      },
      role: {
        type: "text",
        label: "Role",
        pathInStore: ["employee", "Result", "JobRole", "DisplayValue"],
      },
      reportsTo: {
        type: "text",
        label: "Reports to",
        pathInStore: ["employee", "Result", "ReportsTo", "DisplayValue"],
      },
      gender: {
        type: "text",
        label: "Gender",
        pathInStore: ["employee", "Result", "Gender", "DisplayValue"],
      },
      salary: {
        type: "salary",
        label: "Salary",
        pathInStore: ["salary", "Result", "0"],
      },
    },
    structure: [
      ["name"],
      ["email"],
      ["department"],
      ["role"],
      ["reportsTo"],
      ["gender"],
      ["salary"],
    ],
  },
};

export { employee };
