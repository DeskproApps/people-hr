import get from "lodash/get";
import { Stack } from "@deskpro/deskpro-ui";
import { PeopleHRError } from "../../services/peoplehr";
import { ErrorBlock } from "./ErrorBlock";
import { Container } from "../common";
import { FallbackRender } from "@sentry/react";

const ErrorFallback: FallbackRender = ({ error }) => {
  let message = "There was an error!";
  const button = null;

  // eslint-disable-next-line no-console
  console.error(error);

  if (error instanceof PeopleHRError) {
    message = get(error, ["data", "Message"], message);
  }

  return (
    <Container>
      <ErrorBlock
        text={(
          <Stack gap={6} vertical style={{ padding: "8px" }}>
            {message}
            {button}
          </Stack>
        )}
      />
    </Container>
  );
};

export { ErrorFallback };
