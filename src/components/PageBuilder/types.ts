import type { FC } from "react";
import type { ParamKeyValuePair } from "react-router-dom";
import type { Dict } from "../../types";

export type Endpoint = {
  url: string,
  method?: "POST",
  data?: Dict<unknown>,
  queryParams?: string|Dict<string>|ParamKeyValuePair[],
};

export type BlockSet = {
  type: string;
  label?: string,
  keyInStore?: string,
  pathInStore?: string|string[],
  endpoint?: Endpoint,
  props?: Dict<unknown>;
};

export type Props = {
  config: {
    structure: Array<string[]>,
    blocks: Record<string, BlockSet>,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  blocksMap: Record<string, FC<any>>,
  store: Dict<unknown>,
};
