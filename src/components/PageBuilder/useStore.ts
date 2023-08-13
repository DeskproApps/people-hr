import get from "lodash/get";
import reduce from "lodash/reduce";
import { useQueryWithClient } from "@deskpro/app-sdk";
import { baseRequest } from "../../services/peoplehr/mockBaseRequest";
import { SourceType } from "./types";
import type { Dict } from "../../types";
import type { SourceConfig, SourceAPI } from "./types";

type UseStore = (params: Dict<string|undefined>, config?: Dict<SourceConfig>) => Dict<unknown>;

const isApiConfig = (config: SourceConfig): config is SourceAPI  => {
  return get(config, ["source"]) === SourceType.API;
};

/**
 * @param routerParams - to replace param in request url|queryParams|body|etc...
 * @param config
 */
const useStore: UseStore = (routerParams, config) => {
  if (!config) {
    return {};
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fetchedData = reduce<Dict<SourceConfig>, Dict<{ data: any }>>(config, (acc, params, key) => {
    if (isApiConfig(params)) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      acc[key] = useQueryWithClient(
        [params.url],
        (client) => baseRequest(client,  params),
      );
    }
    return acc;
  }, {});

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return reduce<Dict<{ data: any }>, Dict<any>>(fetchedData, (acc, { data }, key) => {
    acc[key] = data;
    return acc;
  }, {});
};

export { useStore };
