import size from "lodash/size";
import {
  Title,
  Property,
  TwoProperties,
  HorizontalDivider,
} from "@deskpro/app-sdk";
import { Container } from "../../common";
import { format } from "../../../utils/date";
import type { FC } from "react";
import type { Maybe } from "../../../types";
import type { Late } from "../../../services/peoplehr/types";

type Props = {
  lateness: Maybe<Late[]>,
};

const LateItem: FC<Late> = ({ LateDate, LateMinutes, Comments }) => (
  <div style={{ marginBottom: 14 }}>
    <TwoProperties
      leftLabel="Late date"
      leftText={format(LateDate)}
      rightLabel="Minutes late"
      rightText={LateMinutes}
    />
    <Property
      label="Comments"
      text={Comments}
    />
  </div>
);

const Lateness: FC<Props> = ({ lateness }) => {
  return (!Array.isArray(lateness) || !size(lateness)) ? null : (
    <>
      <Container>
        <Title title={`Lateness (${size(lateness)})`} />
        {lateness.map((late) => (
          <LateItem key={late.LateDate} {...late} />
        ))}
      </Container>
      <HorizontalDivider/>
    </>
  );
};

export { Lateness };
