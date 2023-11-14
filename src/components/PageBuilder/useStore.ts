import { useState, useEffect } from "react";
import get from "lodash/get";
import map from "lodash/map";
import isEmpty from "lodash/isEmpty";
import {
  useDeskproAppClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { baseRequest } from "../../services/peoplehr/mockBaseRequest";
import { SOURCE_TYPE } from "./constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Dict, UserContext } from "../../types";
import type { SourceConfig, SourceAPI, SourceContext } from "./types";

type UseStore = (config?: Dict<SourceConfig>) => {
  isLoading: boolean,
  data: Dict<unknown>,
};

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
const useStore: UseStore = (config) => {
  const { context } = useDeskproLatestAppContext() as { context: UserContext };
  const { client } = useDeskproAppClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Dict<unknown>>({});

  useEffect(() => {
    if (!client || isEmpty(config) || isEmpty(context)) {
      return;
    }

    (async () => {
      setIsLoading(true);
      setData({});
      const results: Dict<unknown> = {};

      await Promise.all(map(config, async (params, key) => {
        if (isApiConfig(params)) {
          results[key] = await baseRequest(client as IDeskproClient,  params);
        } else if (isContextConfig(params)) {
          results[key] = get(context, get(params, ["path"]));
        }
      }));
      setIsLoading(false);
      setData(results);
    })();


  }, [client, config, context]);

  return { isLoading, data };
};

export { useStore };
