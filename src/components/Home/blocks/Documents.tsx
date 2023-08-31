import size from "lodash/size";
import { TSpan } from "@deskpro/deskpro-ui";
import { Title, HorizontalDivider, TwoProperties } from "@deskpro/app-sdk";
import { Link, Container } from "../../common";
import type { FC } from "react";
import type { Maybe } from "../../../types";
import type { Document } from "../../../services/peoplehr/types";

type Props = {
  documents: Maybe<Document[]>,
};

const DocumentItem: FC<Document> = ({ URL, DocumentName, AddedOn, Category }) => {
  return (
    <div style={{ marginBottom: 14 }}>
      <Link target="_blank" href={URL}>
        <TSpan type="h3">{DocumentName}</TSpan>
      </Link>
      <TwoProperties
        leftLabel="Category"
        leftText={Category}
        rightLabel="Added on"
        rightText={AddedOn}
      />
    </div>
  );
};

const Documents: FC<Props> = ({ documents }) => {
  return (!Array.isArray(documents) || !size(documents)) ? null : (
    <>
      <Container>
        <Title title="Documents" />
        {documents.map((document) => (
          <DocumentItem key={document.DocumentId} {...document} />
        ))}
      </Container>
      <HorizontalDivider/>
    </>
  );
};

export { Documents };
