import MuiAlert from "@material-ui/lab/Alert";
import Skeleton from "@material-ui/lab/Skeleton";
import { useLoadScript } from "@react-google-maps/api";
import React, { useCallback } from "react";
import { FormContext, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { createRouteRequest } from "../../../api/queries/routes";
import Page from "../../../components/Common/Page";
import RouteForm from "../../../components/Routes/Form";
import Config from "../../../config";
import { CreateRouteAPIRequest } from "../../../core/interfaces/routes";
import routesAddValidationSchema from "./validation";

const googleMapsLibraries = ["places"];

const AddRoutePage: React.FC = () => {
  const history = useHistory();

  const { t } = useTranslation();
  const { pageTitle } = t("addRoute");

  const [create] = useMutation(createRouteRequest);

  const form = useForm({
    validationSchema: routesAddValidationSchema,
    defaultValues: { waypoints: [""] },
  });

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: Config.googleMapsApiKey,
    preventGoogleFontsLoading: true,
    libraries: googleMapsLibraries,
  });

  const onSubmit = useCallback(
    async (data: CreateRouteAPIRequest) => {
      const route = await create(data);
      history.push(`/seller/logistic/routes/${route.id}`);
    },
    [create, history]
  );

  if (loadError) {
    return (
      <MuiAlert severity="error" elevation={6} variant="filled">
        {t("mapLoadingError")}
      </MuiAlert>
    );
  }

  if (!isLoaded) {
    return (
      <Page title={pageTitle}>
        {Array.from(Array(10).keys()).map((number) => (
          <Skeleton key={number} />
        ))}
      </Page>
    );
  }

  return (
    <Page title={pageTitle}>
      <FormContext {...form}>
        <RouteForm onSubmit={onSubmit} />
      </FormContext>
    </Page>
  );
};

export default AddRoutePage;
