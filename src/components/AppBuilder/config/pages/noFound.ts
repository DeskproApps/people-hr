const noFound = {
  path: "/not-found",
  page: {
    blocks: {
      title: {
        type: "title",
        props: { title: "No match found" },
      },
      description: {
        type: "text",
        props: { value: "Employee email address must match Deskpro user’s email address" },
      },
    },
    structure: [
      ["title"],
      ["description"],
    ],
  },
};

export { noFound };
