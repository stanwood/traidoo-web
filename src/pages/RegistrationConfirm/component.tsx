import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { confirmRegistrationRequest } from "../../api/queries/users/register";
import Page from "../../components/Common/Page";
import RegistrationConfirm from "../../components/RegistrationConfirm";

const RegistrationConfirmPage = () => {
  const [success, setSuccess] = useState<boolean | undefined>(undefined);
  const { uid, token } = useParams();
  const { t } = useTranslation();
  const pageTitle = t("confirmRegistration");

  useEffect(() => {
    if (uid && token) {
      // @ts-ignore
      confirmRegistrationRequest(uid, token)
        .then(() => {
          setSuccess(true);
        })
        .catch(() => {
          setSuccess(false);
        });
    }
  }, [uid, token]);

  return (
    <Page title={pageTitle}>
      <RegistrationConfirm success={success} />
    </Page>
  );
};

export default RegistrationConfirmPage;
