const loadingApp = {
  path: "/",
  index: true,
  page: {
    store: {
      employees: {
        source: "$api",
        url: "$mock/mockEmployees",
      },
      userPrimaryEmail: {
        source: "$context",
        path: ["data", "user", "primaryEmail"],
      },
      userEmails: {
        source: "$context",
        path: ["data", "user", "emails"],
      },
    },
    find: {
      if: [
        { type: "array", storeKey: ["employees", "Result"], storePath: ["EmailId", "DisplayValue"] },
        { type: "object", storeKey: "userPrimaryEmail" }
      ],
      then: "/employee/:id",
      else: "/no_found",
    },
    blocks: {
      loading: {
        type: "loadingSpinner",
      }
    },
    structure: [
      ["loading"],
    ],
  },
};

export { loadingApp };
