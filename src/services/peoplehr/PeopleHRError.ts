import type { PeopleHRAPIError } from "./types";

export type InitData = {
  status: number,
  data: PeopleHRAPIError,
};

class PeopleHRError extends Error {
  status: number;
  data: PeopleHRAPIError;

  constructor({ status, data }: InitData) {
    const message = "People HR Api Error";
    super(message);

    this.data = data;
    this.status = status;
  }
}

export { PeopleHRError };
