import mockContextUser1000 from "./mockContextUser1000.json";
import mockContextUser1001 from "./mockContextUser1001.json";

const useDeskproLatestAppContext = (userId: null) => {
  return {
    context: userId ? mockContextUser1001 : mockContextUser1000,
  };
};

export { useDeskproLatestAppContext };
