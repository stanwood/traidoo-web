import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { confirmRegistrationRequest } from "../../api/queries/users/register";
import RegistrationConfirm from "../../components/RegistrationConfirm";

const RegistrationConfirmPage = () => {
  const [success, setSuccess] = useState<boolean | undefined>(undefined);
  const { uid, token } = useParams();
  const { t } = useTranslation();

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
    <>
      <Helmet>
        <title>{t("confirmRegistration")}</title>
      </Helmet>

      <RegistrationConfirm success={success} />
    </>
  );
};

export default RegistrationConfirmPage;
