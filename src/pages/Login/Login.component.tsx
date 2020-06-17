import React, { useCallback, useContext } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { storeAccessToken, storeRefreshToken } from "../../api/jwt";
import { getTokenRequest } from "../../api/queries/users/token";
import LoginForm from "../../components/Login/LoginForm";
import { CartContext } from "../../contexts/CartContext/context";
import { UserContext } from "../../contexts/UserContext/context";
import { FormData } from "./interfaces";
import validationSchema from "./Login.validation";

const Login: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const { refetch: refetchCart } = useContext(CartContext);
  const { refetch: fetchUser } = useContext(UserContext);

  const { register, handleSubmit, errors, setError } = useForm<FormData>({
    validationSchema: validationSchema,
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
      setError("email", "incorrectData", t("incorrectEmailOrPassword"));
    },
  });

  const onSubmit = useCallback(
    async (formData: FormData): Promise<void> => {
      await mutate({ email: formData.email, password: formData.password });
    },
    [mutate]
  );

  return (
    <>
      <Helmet>
        <title>{t("login")}</title>
      </Helmet>
      <LoginForm
        errors={errors}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default Login;
