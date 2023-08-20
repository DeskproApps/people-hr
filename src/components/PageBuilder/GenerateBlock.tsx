import get from "lodash/get";
import { Property } from "../common";
import type { FC, ComponentType } from "react";
import type { Dict } from "../../types";
import type { BlockSet } from "./types";

type Props = {
  blockName: string,
  blockConfig: BlockSet,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: ComponentType<{ value: any } & Dict<any>>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  store: Dict<any>,
};

const GenerateBlock: FC<Props> = ({ blockConfig, Component, store }) => {
  const blockType = get(blockConfig, ["type"]);
  const { value, ...blockProps } = get(blockConfig, ["props"]) || {};
  const label = get(blockConfig, ["label"]);
  const pathInStore = get(blockConfig, ["pathInStore"], "");

  if (!blockConfig) {
    // eslint-disable-next-line no-console
    console.error("PageBuilder: wrong config - block config not found");
    return null;
  }

  if (!Component) {
    // eslint-disable-next-line no-console
    console.error("PageBuilder: can't find component for block type", blockType);
    return null;
  }

  return (
    <Property
      label={label}
      text={(
        <Component
          {...blockProps}
          value={value || get(store, pathInStore, "-") || "-"}
        />
      )}
    />
  );
};

export { GenerateBlock };
