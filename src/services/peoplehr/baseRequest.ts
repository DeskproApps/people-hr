import has from "lodash/has";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { proxyFetch, adminGenericProxyFetch } from "@deskpro/app-sdk";
import { BASE_URL, placeholders } from "../../constants";
import { getQueryParams, isAPIError } from "../../utils";
import { PeopleHRError } from "./PeopleHRError";
import type { Request } from "../../types";

const baseRequest: Request = async (client, {
  url,
  rawUrl,
  headers,
  data = {},
  settings = {},
  method = "POST",
  queryParams = {},
}) => {
  const dpFetch = await (has(settings, ["api_key"]) ? adminGenericProxyFetch : proxyFetch)(client);

  const baseUrl = rawUrl ? rawUrl : `${BASE_URL}${url}`;
  const params = getQueryParams(queryParams);

  const requestUrl = `${baseUrl}${params}`;
  const options: RequestInit = { method, headers };

  if (data instanceof FormData) {
    options.body = data;
  } else if (!isEmpty(data)) {
    options.body = JSON.stringify({
      APIKey: get(settings, ["api_key"], placeholders.API_KEY),
      ...data,
    });
    options.headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };
  }

  const res = await dpFetch(requestUrl, options);

  let response = {
    isError: true,
    Status: 0,
    Message: "",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Result: {} as any,
  };

  try {
    response = await res.json();
  } catch (e) {
    return response;
  }

  if (res.status < 200 || res.status > 399) {
    throw new PeopleHRError({
      status: res.status,
      data: await res.json(),
    });
  }

  if (res.status === 200 && isAPIError(response)) {
    throw new PeopleHRError({
      status: res.status,
      data: response,
    });
  }

  return response;
};

export { baseRequest };
