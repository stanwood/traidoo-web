import Skeleton from "@material-ui/lab/Skeleton";
import { format } from "date-fns";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import {
  getUserPersonalProfileRequest,
  updateUserPersonalProfileRequest,
} from "../../../api/queries/users/profile";
import PersonalProfileForm from "../../../components/Profile/Personal";
import { FormData } from "./interfaces";
import validationSchema from "./validation";

const PersonalProfile: React.FC = () => {
  const [registrationErrors, setRegistrationErrors] = useState({});
  const [editMode, setEditMode] = React.useState(false);
  const { t } = useTranslation();

  const { data, refetch } = useQuery(
    "/users/profile/personal",
    getUserPersonalProfileRequest
  );

  const {
    register,
    handleSubmit,
    errors,
    setValue,
    setError,
    clearError,
    reset,
  } = useForm<FormData>({
    validationSchema,
  });

  async function handleError(error: any) {
    let errors: any = {};

    const errorResponse = await error.response.json();

    Object.entries(errorResponse).forEach(([key, value]: [string, any]) => {
      errors[key] = value[0].message; // TODO: do not use messages from API
    });

    setRegistrationErrors(errors);
  }

  const onSubmit = (formData: FormData) => {
    // @ts-ignore
    formData.birthday = format(formData.birthday, "yyyy-MM-dd");

    // TODO: use useQuery to edit the data instead of ky
    updateUserPersonalProfileRequest(formData)
      .then((data: any) => {
        setEditMode(false);
        refetch(); // TODO: is it required?
      })
      .catch((error: any) => {
        handleError(error);
      });
  };

  return (
    <>
      <Helmet>
        <title>{t("personalProfile")}</title>
      </Helmet>

      {!data && (
        <>
          {Array.from(Array(10).keys()).map((number: number) => (
            <Skeleton key={number} />
          ))}
        </>
      )}

      {data && (
        <PersonalProfileForm
          apiErrors={registrationErrors}
          errors={errors}
          register={register}
          handleSubmit={handleSubmit}
          setValue={setValue}
          setError={setError}
          clearError={clearError}
          onSubmit={onSubmit}
          onCancel={reset}
          profile={data}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      )}
    </>
  );
};

export default PersonalProfile;
