import get from "lodash/get";
import type { PeopleHRAPIError, Response } from "../services/peoplehr/types";

const isAPIError = (res?: Response): res is PeopleHRAPIError => {
  return get(res, ["isError"], false);
};

export { isAPIError };
