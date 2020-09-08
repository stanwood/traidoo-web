import { yupResolver } from "@hookform/resolvers";
import React, { useCallback, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { storeAccessToken, storeRefreshToken } from "../../api/jwt";
import { getTokenRequest } from "../../api/queries/users/token";
import Page from "../../components/Common/Page";
import LoginForm from "../../components/Login/LoginForm";
import { CartContext } from "../../contexts/CartContext/context";
import { UserContext } from "../../contexts/UserContext/context";
import { FormData } from "./interfaces";
import validationSchema from "./Login.validation";

const Login: React.FC = () => {
  const history = useHistory();

  const { t } = useTranslation();
  const pageTitle = t("login");

  const [loginError, setLoginError] = useState<boolean>(false);

  const { refetch: refetchCart } = useContext(CartContext);
  const { refetch: fetchUser } = useContext(UserContext);

  const { register, handleSubmit, errors, setError } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const [mutate] = useMutation(getTokenRequest, {
    onSuccess: async (data) => {
      storeRefreshToken(data.refresh);
      storeAccessToken(data.access);
      await fetchUser();
      refetchCart();
      history.push("/");
    },
    onError: () => {
      setError("email", { type: "incorrectData", message: "" });
      setError("password", { type: "incorrectData", message: "" });
      setLoginError(true);
    },
  });

  const onSubmit = useCallback(
    async (formData: FormData): Promise<void> => {
      setLoginError(false);
      await mutate({ email: formData.email, password: formData.password });
    },
    [mutate]
  );

  return (
    <Page title={pageTitle}>
      <LoginForm
        errors={errors}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        loginError={loginError}
        setLoginError={setLoginError}
      />
    </Page>
  );
};

export default Login;
