import Skeleton from "@material-ui/lab/Skeleton";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import {
  getUserCompanyProfileRequest,
  getUserDocumentsRequest,
  getUserMangopayDocumentsRequest,
  updateUserDocumentRequest,
  updateUserMangopayDocumentRequest,
} from "../../../api/queries/users/profile";
import CompanyDocumentsForm from "../../../components/Profile/Documents";
import { Context } from "../../../core/context";
import requiredDocuments from "../../../core/utils/requiredDocuments";

const CompanyDocuments = () => {
  const context = useContext(Context);
  const user = context.state.user;

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

  if (!documents || !mangopayDocuments || !company || !user) {
    return (
      <>
        {Array.from(Array(10).keys()).map((number: number) => (
          <Skeleton key={number} />
        ))}
      </>
    );
  }

  return (
    <CompanyDocumentsForm
      documentUpload={documentUpload}
      mangopayDocumentUpload={mangopayDocumentUpload}
      documents={documents}
      mangopayDocuments={mangopayDocuments}
      requiredFields={requiredDocuments(
        user?.groups?.includes("seller") || false, // TODO: is it correct? false default?
        // @ts-ignore
        company.companyType
      )}
    />
  );
};

export default CompanyDocuments;
