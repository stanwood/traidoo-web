import { yupResolver } from "@hookform/resolvers";
import MuiAlert from "@material-ui/lab/Alert";
import Skeleton from "@material-ui/lab/Skeleton";
import { useLoadScript } from "@react-google-maps/api";
import React, { useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { createRouteRequest } from "../../../api/queries/routes";
import Page from "../../../components/Common/Page";
import RouteForm from "../../../components/Routes/Form";
import Config from "../../../config";
import { RouteFormFields } from "../../../core/interfaces/routes/form";
import routesAddValidationSchema from "./validation";

const googleMapsLibraries = ["places"];

const AddRoutePage: React.FC = () => {
  const history = useHistory();

  const { t } = useTranslation();
  const pageTitle = t("addRoute");

  const [create] = useMutation(createRouteRequest);

  const form = useForm({
    defaultValues: { waypoints: [""] },
    resolver: yupResolver(routesAddValidationSchema),
  });

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: Config.googleMapsApiKey,
    preventGoogleFontsLoading: true,
    libraries: googleMapsLibraries,
  });

  const onSubmit = useCallback(
    async (data: RouteFormFields) => {
      const newData = {
        ...data,
        waypoints: data.waypoints.map((waypoint) => waypoint.name),
      };
      const route = await create(newData);
      if (route) history.push(`/seller/logistic/routes/${route.id}`);
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
      <FormProvider {...form}>
        <RouteForm onSubmit={onSubmit} />
      </FormProvider>
    </Page>
  );
};

export default AddRoutePage;
