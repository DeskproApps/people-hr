import get from "lodash/get";
import reduce from "lodash/reduce";
import {
  // useQueryWithClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { baseRequest } from "../../services/peoplehr/mockBaseRequest";
import { SOURCE_TYPE } from "./constants";
import type { Dict, UserContext } from "../../types";
import type {SourceConfig, SourceAPI, SourceContext} from "./types";

import { useQuery as useQueryWithClient } from "@tanstack/react-query";

type UseStore = (params: Dict<string|undefined>, config?: Dict<SourceConfig>) => Dict<unknown>;

const isApiConfig = (config: SourceConfig): config is SourceAPI  => {
  return get(config, ["source"]) === SOURCE_TYPE.API;
};

const isContextConfig = (config: SourceConfig): config is SourceContext  => {
  return get(config, ["source"]) === SOURCE_TYPE.Context;
};

/**
 * @param routerParams - to replace param in request url|queryParams|body|etc...
 * @param config
 */
const useStore: UseStore = (routerParams, config) => {
  const { context } = useDeskproLatestAppContext() as { context: UserContext };

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
    } else if (isContextConfig(params)) {
      acc[key] = { data: get(context, get(params, ["path"])) };
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
