import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { confirmRegistrationRequest } from "../../api/queries/users/register";
import RegistrationConfirm from "../../components/RegistrationConfirm";

const RegistrationConfirmPage = () => {
  const [success, setSuccess] = useState<boolean | undefined>(undefined);
  const { uid, token } = useParams();

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

  return <RegistrationConfirm success={success} />;
};

export default RegistrationConfirmPage;
