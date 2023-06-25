import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { Property } from "../common";
import type { FC, ReactNode, ComponentType } from "react";

type BlockSet = {
  type: string;
  props?: {
    label?: string,
    pathInStore?: string|string[],
  } & Record<string, unknown>;
};

type Props = {
  config: {
    structure: Array<string[]>,
    blocks: Record<string, BlockSet>
  };
  blocksMap: Record<string, FC<any>>;
  store: Record<string, unknown>;
};

const PageBuilder: FC<Props> = ({
  store,
  blocksMap,
  config: { structure, blocks },
}) => {
  if (!Array.isArray(structure) ||isEmpty(structure)) {
    console.error("PageBuilder: wrong config - empty structure");
    return null;
  }

  if (isEmpty(blocks)) {
    console.error("PageBuilder: wrong config - empty block");
    return null;
  }

  if (isEmpty(blocksMap)) {
    // @todo: add some default blocks map
    console.error("PageBuilder: empty blocks map");
  }

  return (
    <>
      {structure.map((blockName) => {
        const blockConfig = get(blocks, [blockName[0]]);
        const blockType = get(blockConfig, ["type"]);
        const blockProps = get(blockConfig, ["props"]);
        const Component = get(blocksMap, [blockType]);
        console.log(">>> map:block:", blockConfig);

        if (!blockConfig) {
          console.error("PageBuilder: wrong config - block config not found");
          return null;
        }

        if (!Component) {
          console.error("PageBuilder: can't find component for block type", blockType);
          return null;
        }

        const { label, pathInStore,...props } = blockProps;

        return (
          <Property
            label={label}
            text={<Component {...props} value={get(store, pathInStore, "-")} />}
          />
        );
      })}
    </>
  );
};

export { PageBuilder };
