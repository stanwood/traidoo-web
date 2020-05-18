import MuiAlert from "@material-ui/lab/Alert";
import Skeleton from "@material-ui/lab/Skeleton";
import { useLoadScript } from "@react-google-maps/api";
import React from "react";
import { FormContext, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { createRoute } from "../../../api/queries/routes";
import AddRoute from "../../../components/Routes/Add";
import Config from "../../../config";
import routesAddValidationSchema from "./validation";

const googleMapsLibraries = ["places"];

const AddRoutePage = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const form = useForm({
    validationSchema: routesAddValidationSchema,
    defaultValues: { waypoints: [""] },
  });
  const [create] = useMutation(createRoute);
  const onSubmit = (data: any) => {
    create(data).then(() => history.push("/seller/logistic/routes"));
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: Config.googleMapsApiKey,
    preventGoogleFontsLoading: true,
    libraries: googleMapsLibraries,
  });

  if (loadError) {
    return (
      <MuiAlert severity="error" elevation={6} variant="filled">
        {t("mapLoadingError")}
      </MuiAlert>
    );
  }

  if (!isLoaded) {
    return (
      <>
        {Array.from(Array(10).keys()).map((number) => (
          <Skeleton key={number} />
        ))}
      </>
    );
  }

  return (
    <FormContext {...form}>
      <AddRoute onSubmit={onSubmit} />
    </FormContext>
  );
};

export default AddRoutePage;
