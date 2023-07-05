// import { useDeskproAppClient } from "@deskpro/app-sdk";
import type { Dict } from "../../types";
import type { BlockSet } from "./types";

type UseStore = (blocksConfig: Dict<BlockSet>) => Dict<unknown>;

const useStore: UseStore = (blocksConfig) => {
  // const { client } = useDeskproAppClient();

  // eslint-disable-next-line no-console
  console.log(">>> hooks:", blocksConfig);

  return {};
};

export { useStore };
