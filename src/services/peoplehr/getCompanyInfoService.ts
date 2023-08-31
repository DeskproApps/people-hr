import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Maybe, Settings } from "../../types";
import type { Company } from "./types";

const getCompanyInfoService = (
  client: IDeskproClient,
  settings: Maybe<Settings>,
) => {
  return baseRequest<Company>(client, {
    url: "/Employee",
    data: {
      Action: "GetCompanyInformation",
    },
    settings,
  });
};

export { getCompanyInfoService };
