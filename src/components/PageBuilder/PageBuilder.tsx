import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { useParams } from "react-router-dom";
import { useStore } from "./useStore";
import { GenerateBlock } from "./GenerateBlock";
import type { FC } from "react";
import type { Props } from "./types";

const PageBuilder: FC<Props> = ({
  store,
  blocksMap,
  config: { structure, blocks },
}) => {
  const routerParams = useParams();
  const pageStore = useStore(routerParams, store);

  if (!Array.isArray(structure) ||isEmpty(structure)) {
    // eslint-disable-next-line no-console
    console.error("PageBuilder: wrong config - empty structure");
    return null;
  }

  if (isEmpty(blocks)) {
    // eslint-disable-next-line no-console
    console.error("PageBuilder: wrong config - empty block");
    return null;
  }

  if (isEmpty(blocksMap)) {
    // @todo: add some default blocks map
    // eslint-disable-next-line no-console
    console.error("PageBuilder: empty blocks map");
  }

  return (
    <>
      {structure.map((blockName) => {
        const name = blockName[0];
        const blockConfig = get(blocks, name);
        const blockType = get(blockConfig, ["type"]);
        const Component = get(blocksMap, [blockType]);

        return (
          <GenerateBlock
            key={name}
            blockName={name}
            blockConfig={blockConfig}
            Component={Component}
            store={pageStore}
          />
        );
      })}
    </>
  );
};

export { PageBuilder };
