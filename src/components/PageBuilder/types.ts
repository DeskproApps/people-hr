import { SOURCE_TYPE } from "./constants";
import type { FC } from "react";
import type { Dict, RequestParams } from "../../types";

export type SourceType = typeof SOURCE_TYPE[keyof typeof SOURCE_TYPE];

export type SourceAPI = {
  source: typeof SOURCE_TYPE.API,
} & RequestParams;

export type SourceContext = {
  source: typeof SOURCE_TYPE.Context,
  path: string[],
};

export type SourceConfig = SourceAPI | SourceContext;

export type Operand = {
  type: "array"|"object"|"string",
  storeKey: string,
  storePath: string|string[],
};

export type FindConfig = {
  if: [Operand, Operand], // compare two values from the store [firstValue, secondValue]
  then: string, // navigate to
  else: string, // navigate to
};

export type BlockSet = {
  type: string;
  label?: string,
  pathInStore?: string|string[],
  props?: { value?: unknown } & Dict<unknown>;
};

export type Props = {
  config: {
    store?: Dict<SourceConfig>,
    find?: FindConfig,
    structure: Array<string[]>,
    blocks: Record<string, BlockSet>,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  blocksMap: Record<string, FC<any>>,
};
