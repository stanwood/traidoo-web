import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { OrderDocuments } from "../../core/interfaces/orders/ordersRequest";
import translateDocumentType from "../../core/utils/translateDocumentType";

interface DocumentsProps {
  documents: OrderDocuments[];
  downloadFile: (documentId: number) => void;
}

const Documents: React.FC<DocumentsProps> = (props: DocumentsProps) => {
  const { documents, downloadFile } = props;
  const { t } = useTranslation();

  if (documents.length < 1) {
    return (
      <Typography variant="body1">
        {t("documentsWilBeAvailableSoon")}
      </Typography>
    );
  }

  return documents.map((document) => (
    <Chip
      key={document.id}
      label={translateDocumentType(document.documentType)}
      onClick={() => downloadFile(document.id)}
    />
  ));
};

export default Documents;
