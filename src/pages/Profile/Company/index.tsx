import Skeleton from "@material-ui/lab/Skeleton";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import {
  deleteUserDeliveryAddressRequest,
  getUserCompanyProfileRequest,
  getUserDeliveryAddressesRequest,
  updateUserCompanyProfileRequest,
} from "../../../api/queries/users/profile";
import CompanyProfileForm from "../../../components/Profile/Company";
import { UserContext } from "../../../contexts/UserContext/context";
import { required } from "../../../utils/errors";
import { CompanyData } from "./types";
import { buyerValidationSchema, sellerValidationShema } from "./validation";

const CompanyProfile: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useContext(UserContext);
  const [registrationErrors, setRegistrationErrors] = useState({});
  const [editMode, setEditMode] = React.useState(false);
  const [
    isCertifiedOrganicProducer,
    setIsCertifiedOrganicProducer,
  ] = React.useState(false);

  // TODO: use useQuery to edit the data instead of ky

  const { data, refetch } = useQuery(
    "/users/profile/company",
    getUserCompanyProfileRequest
  );
  const {
    data: deliveryAddresses,
    refetch: refetchDeliveryAddresses,
  } = useQuery("/delivery_addresses", getUserDeliveryAddressesRequest);

  const isSeller = (): boolean | undefined => {
    return user?.groups?.includes("seller");
  };

  const {
    register,
    handleSubmit,
    errors,
    setValue,
    setError,
    clearError,
    reset,
    getValues,
  } = useForm<CompanyData>({
    validationSchema: isSeller()
      ? sellerValidationShema
      : buyerValidationSchema,
  });

  useEffect(() => {
    register({ name: "companyType" }, { validate: required("Company type") });
    setValue("companyType", data?.companyType || "");
  }, [register, setError, setValue, data]);

  async function handleError(error: any) {
    const errors: any = {};

    const errorResponse = await error.response.json();

    Object.entries(errorResponse).forEach(([key, value]: [string, any]) => {
      errors[key] = value[0].message; // TODO: do not use messages from API
    });

    setRegistrationErrors(errors);
  }

  const onSubmit = (formData: FormData) => {
    updateUserCompanyProfileRequest(formData)
      .then((data: any) => {
        setEditMode(false);
        refetch(); // TODO: is it required?
      })
      .catch((error: any) => {
        handleError(error);
      });
  };

  const onDelete = (id: number) => {
    deleteUserDeliveryAddressRequest(id)
      .then(() => {
        refetchDeliveryAddresses(); // TODO: is it required?
      })
      .catch((error: any) => {});
  };

  return (
    <>
      <Helmet>
        <title>{t("companyProfile")}</title>
      </Helmet>

      {!data && (
        <>
          {Array.from(Array(10).keys()).map((number: number) => (
            <Skeleton key={number} />
          ))}
        </>
      )}

      {data && (
        <CompanyProfileForm
          apiErrors={registrationErrors}
          errors={errors}
          register={register}
          handleSubmit={handleSubmit}
          setValue={setValue}
          setError={setError}
          clearError={clearError}
          onSubmit={onSubmit}
          getValues={getValues}
          onCancel={reset}
          onDelete={onDelete}
          profile={data}
          deliveryAddresses={deliveryAddresses}
          editMode={editMode}
          setEditMode={setEditMode}
          isCertifiedOrganicProducer={isCertifiedOrganicProducer}
          setIsCertifiedOrganicProducer={setIsCertifiedOrganicProducer}
          isSeller={isSeller()}
        />
      )}
    </>
  );
};

export default CompanyProfile;
