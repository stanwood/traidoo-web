import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { storeAccessToken, storeRefreshToken } from "../../api/jwt";
import { getCartRequest } from "../../api/queries/cart";
import { getTokenRequest } from "../../api/queries/users/token";
import { getCurrentUserRequest } from "../../api/queries/users/user";
import LoginForm from "../../components/Login/LoginForm";
import { Context } from "../../core/context";
import { FormData } from "./interfaces";
import validationSchema from "./Login.validation";

const Login = () => {
  const context = useContext(Context);
  const history = useHistory();
  const { t } = useTranslation();

  const { register, handleSubmit, errors, setError } = useForm<FormData>({
    validationSchema: validationSchema,
  });

  const { refetch: refetchCart } = useQuery("/cart", getCartRequest, {
    onSuccess: (data: any) => {
      context.dispatch({ type: "cart", payload: data });
    },
  });

  const { refetch: refetchProfile } = useQuery(
    "/users/profile/me",
    getCurrentUserRequest,
    {
      manual: true,
      onSuccess: (data: any) => {
        context.dispatch({ type: "user", payload: data });
        history.push("/");
      },
    }
  );

  const [mutate] = useMutation(getTokenRequest, {
    onSuccess: (data: any) => {
      storeRefreshToken(data.refresh);
      storeAccessToken(data.access);
      refetchProfile();
      refetchCart();
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

  const onSubmit = async (formData: FormData) => {
    await mutate({ email: formData.email, password: formData.password });
  };

  return (
    <LoginForm
      errors={errors}
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
    />
  );
};

export default Login;