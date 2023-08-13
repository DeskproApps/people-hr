const config = {
  employee: {
    endpoint: {
      url: "https://api.peoplehr.net/Employee",
      method: "POST",
      body: {Action: "GetAllEmployeeDetail"}
    },
    pathInResponse: ["Result"],
    /*find: {
      type: "array", // array|object
      key: "email",
      value: [
        ["$context", "data", "user", "primaryEmail"],
        ["$context", "data", "user", "emails"],
      ],
    },*/
    find: {
      key: "user.email",
      value: {
        type: "array", // array|object
        // source: SourceType.Context,
        key: "email",
        value: [
          ["data", "user", "primaryEmail"],
          ["data", "user", "emails"],
        ],
        result: {
          true: "/employee",
          false: "/no_found",
        }
      },
    }
  },
};

export { config };
