import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, { ChangeEvent } from "react";
import { isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";
import useStyles from "./styles";

const mangopayErrorsMapping: { [key: string]: string } = {
  CREATED: i18n.t("awaitingValidation"),
  VALIDATION_ASKED: i18n.t("awaitingValidation"),
  VALIDATED: i18n.t("approved"),
  REFUSED: i18n.t("refused"),
};

const CompanyDocumentsForm = ({
  documentUpload,
  mangopayDocumentUpload,
  documents,
  mangopayDocuments,
  requiredFields,
}: any) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const getMangopayDocument = (documentType: string) => {
    return mangopayDocuments?.find((item: any) => item.Type === documentType);
  };

  const generateDocumentStatus = (
    isMangopayDocument: boolean,
    document: any
  ) => {
    if (!document) {
      return <Typography color="error">{t("missing")}</Typography>;
    }

    if (!isMangopayDocument) {
      return <Typography color="primary">{t("valid")}</Typography>;
    }

    if (!document?.Status) {
      return undefined;
    }

    if (document?.RefusedReasonMessage) {
      return (
        <Typography color="error">
          `${mangopayErrorsMapping[document.Status]}: $
          {document?.RefusedReasonMessage}`
        </Typography>
      );
    }

    return (
      <Typography color="primary">
        {mangopayErrorsMapping[document.Status]}
      </Typography>
    );
  };

  const renderUploadButton = (
    id: string,
    accept: string,
    text: string,
    isMangopayDocument: boolean,
    upload: Function,
    document: any | undefined = undefined
  ) => {
    const textPrefix =
      document?.Status || (document && document[id])
        ? t("replace")
        : t("upload");

    const processUpload = (event: ChangeEvent<HTMLInputElement>) => {
      // @ts-ignore
      upload(id, event.target.files[0]);
    };

    return (
      <>
        <Grid item xs={8}>
          <input
            accept={accept}
            className={classes.input}
            id={id}
            type="file"
            disabled={isMobile}
            onChange={(event) => processUpload(event)}
          />
          <label htmlFor={id}>
            <Button
              variant="outlined"
              color="primary"
              component="span"
              size="large"
              disabled={isMobile}
              fullWidth
            >
              {textPrefix} {text}
            </Button>
          </label>
        </Grid>
        <Grid item xs={4} className={classes.status}>
          {generateDocumentStatus(isMangopayDocument, document)}
        </Grid>
      </>
    );
  };

  return (
    <Container component="main" maxWidth="md">
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        spacing={2}
      >
        {requiredFields.includes("businessLicense") &&
          renderUploadButton(
            "businessLicense",
            "image/*,application/pdf",
            t("businessLicense"),
            false,
            documentUpload,
            documents.businessLicense
          )}
        {requiredFields.includes("image") &&
          renderUploadButton(
            "image",
            "image/*",
            t("companyLogo"),
            false,
            documentUpload,
            documents.image
          )}
        {requiredFields.includes("identityProof") &&
          renderUploadButton(
            "IDENTITY_PROOF",
            "image/*,application/pdf",
            t("identityProof"),
            true,
            mangopayDocumentUpload,
            getMangopayDocument("IDENTITY_PROOF")
          )}
        {requiredFields.includes("registrationProof") &&
          renderUploadButton(
            "REGISTRATION_PROOF",
            "image/*,application/pdf",
            t("registrationProof"),
            true,
            mangopayDocumentUpload,
            getMangopayDocument("REGISTRATION_PROOF")
          )}
        {requiredFields.includes("articlesOfAssociation") &&
          renderUploadButton(
            "ARTICLES_OF_ASSOCIATION",
            "image/*,application/pdf",
            t("articlesOfAssociation"),
            true,
            mangopayDocumentUpload,
            getMangopayDocument("ARTICLES_OF_ASSOCIATION")
          )}
      </Grid>
    </Container>
  );
};

export default CompanyDocumentsForm;
