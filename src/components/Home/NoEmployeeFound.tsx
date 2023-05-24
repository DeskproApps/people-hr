import styled from "styled-components";
import { P8 } from "@deskpro/deskpro-ui";
import { Title } from "@deskpro/app-sdk";
import { Container } from "../common";
import type { FC } from "react";

const Text = styled(P8)`
  color: ${({ theme }) => theme.colors.grey80};
`;

const NoEmployeeFound: FC = () => {
  return (
    <Container>
      <Title title="No match found" />
      <Text>Employee email address must match Deskpro user’s email address</Text>
    </Container>
  );
};

export { NoEmployeeFound };
