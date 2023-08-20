const loadingApp = {
  path: "/",
  index: true,
  page: {
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
