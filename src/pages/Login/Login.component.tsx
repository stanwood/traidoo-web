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
  const { refetch: refetchCart } = useContext(CartContext);
  const { refetch: fetchUser } = useContext(UserContext);
  const history = useHistory();
  const { t } = useTranslation();

  const { register, handleSubmit, errors, setError } = useForm<FormData>({
    validationSchema: validationSchema,
  });

  const [mutate] = useMutation(getTokenRequest, {
    onSuccess: async (data: any) => {
      storeRefreshToken(data.refresh);
      storeAccessToken(data.access);
      await fetchUser();
      history.push("/");
    },
    onError: (error: any) => {
      if (error.status === 401) {
        setError("email", "incorrectData", t("incorrectEmailOrPassword"));
      } else if (error.status === 400) {
        // TODO: make reusable
        // TODO: should we parse all error or only the first one?
        const [field, data]: any = Object.entries(error.message)[0];
        setError(field, data[0].code, data[0].message);
      }
    },
  });

  const onSubmit = useCallback(async (formData: FormData): Promise<void> => {
    await mutate({ email: formData.email, password: formData.password });
    refetchCart();
  }, []);

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
