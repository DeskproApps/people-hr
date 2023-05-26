import size from "lodash/size";
import { TSpan } from "@deskpro/deskpro-ui";
import { Title, HorizontalDivider } from "@deskpro/app-sdk";
import { Container, Property, TwoProperties } from "../../common";
import { format } from "../../../utils/date";
import type { FC } from "react";
import type { Maybe } from "../../../types";
import type { Qualification } from "../../../services/peoplehr/types";

type Props = {
  qualifications: Maybe<Qualification[]>,
};

const QualificationItem: FC<Qualification> = ({
  Subject,
  ExpiryDate,
  DatePassed,
  Qualification,
}) => (
  <div style={{ marginBottom: 14 }}>
    <TSpan type="h3">{Subject}</TSpan>
    <Property
      label="Qualification"
      text={Qualification}
    />
    <TwoProperties
      leftLabel="Date awarded"
      leftText={format(DatePassed)}
      rightLabel="Expiry date"
      rightText={format(ExpiryDate)}
    />
  </div>
);

const Qualifications: FC<Props> = ({ qualifications }) => {
  return (!Array.isArray(qualifications) || !size(qualifications)) ? null : (
    <>
      <Container>
        <Title title="Qualifications"/>
        {qualifications.map((q) => (
          <QualificationItem key={q.QualificationId} {...q} />
        ))}
      </Container>
      <HorizontalDivider/>
    </>
  );
};

export { Qualifications };
