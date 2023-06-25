import type { FC } from "react";

type Props = {
  value: string|number;
};

const Text: FC<Props> = ({ value }) => (<>{value}</>);

export { Text };
