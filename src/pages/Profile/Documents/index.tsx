import Skeleton from "@material-ui/lab/Skeleton";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import {
  getUserCompanyProfileRequest,
  getUserDocumentsRequest,
  getUserMangopayDocumentsRequest,
  updateUserDocumentRequest,
  updateUserMangopayDocumentRequest,
} from "../../../api/queries/users/profile";
import Page from "../../../components/Common/Page";
import CompanyDocumentsForm from "../../../components/Profile/Documents";
import { UserContext } from "../../../contexts/UserContext/context";
import requiredDocuments from "../../../core/utils/requiredDocuments";

const CompanyDocuments: React.FC = () => {
  const { user, isSeller } = useContext(UserContext);
  const { t } = useTranslation();
  const pageTitle = t("documents");

  const { data: company } = useQuery(
    "/users/profile/company",
    getUserCompanyProfileRequest
  );
  const { data: documents } = useQuery(
    "/users/profile/documents",
    getUserDocumentsRequest
  );
  const { data: mangopayDocuments } = useQuery(
    "/users/profile/documents/mangopay",
    getUserMangopayDocumentsRequest
  );

  const documentUpload = (name: string, file: File) => {
    updateUserDocumentRequest(name, file);
  };

  const mangopayDocumentUpload = (name: string, file: File) => {
    // TODO: use useQuery to edit the data instead of ky
    updateUserMangopayDocumentRequest(name, file);
  };

  return (
    <Page title={pageTitle}>
      {!documents || !mangopayDocuments || !company || !user ? (
        Array.from(Array(10).keys()).map((number) => <Skeleton key={number} />)
      ) : (
        <CompanyDocumentsForm
          documentUpload={documentUpload}
          mangopayDocumentUpload={mangopayDocumentUpload}
          documents={documents}
          mangopayDocuments={mangopayDocuments}
          requiredFields={requiredDocuments(isSeller, company.companyType)}
        />
      )}
    </Page>
  );
};

export default CompanyDocuments;
