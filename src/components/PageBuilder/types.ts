import type { FC } from "react";
import type { Dict, RequestParams } from "../../types";

export enum SourceType {
  Context = "#context",
  API = "#api",
}

export type SourceAPI = {
  source: SourceType.API,
} & RequestParams;

export type SourceContext = {
  source: SourceType.Context,
} & { /* Deskpro Context */ };

export type SourceConfig = SourceAPI | SourceContext;

export type BlockSet = {
  type: string;
  label?: string,
  pathInStore?: string|string[],
  props?: { value?: unknown } & Dict<unknown>;
};

export type Props = {
  config: {
    structure: Array<string[]>,
    blocks: Record<string, BlockSet>,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  blocksMap: Record<string, FC<any>>,
  store?: Dict<SourceConfig>,
};
