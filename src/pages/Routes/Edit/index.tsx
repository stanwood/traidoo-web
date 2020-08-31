import MuiAlert from "@material-ui/lab/Alert";
import Skeleton from "@material-ui/lab/Skeleton";
import { useLoadScript } from "@react-google-maps/api";
import React, { useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { queryCache, useMutation, useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import { editRouteRequest, getRouteRequest } from "../../../api/queries/routes";
import Page from "../../../components/Common/Page";
import RouteForm from "../../../components/Routes/Form";
import Config from "../../../config";
import { CreateRouteAPIRequest, Route } from "../../../core/interfaces/routes";
import routesAddValidationSchema from "./validation";

const googleMapsLibraries = ["places"];

const EditRoutePage: React.FC = () => {
  const history = useHistory();
  const { id: routeId } = useParams<{ id: string }>();

  const { t } = useTranslation();
  const { pageTitle } = t("editRoute");

  const form = useForm({
    validationSchema: routesAddValidationSchema,
  });

  const [edit] = useMutation(editRouteRequest, {
    onSuccess: () => queryCache.invalidateQueries(["route", Number(routeId)]),
  });

  const { data, status } = useQuery(
    ["route", Number(routeId)],
    getRouteRequest,
    {
      cacheTime: 1,
      onSuccess: (data: Route) => {
        form.setValue([
          { origin: data.origin },
          { destination: data.destination },
          { waypoints: data.waypoints },
          { frequency: data.frequency },
        ]);
      },
    }
  );

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: Config.googleMapsApiKey,
    preventGoogleFontsLoading: true,
    libraries: googleMapsLibraries,
  });

  const onSubmit = useCallback(
    async (data: CreateRouteAPIRequest) => {
      const route = await edit({ id: Number(routeId), data });
      history.push(`/seller/logistic/routes/${route.id}`);
    },
    [edit, history, routeId]
  );

  if (loadError) {
    return (
      <MuiAlert severity="error" elevation={6} variant="filled">
        {t("mapLoadingError")}
      </MuiAlert>
    );
  }

  if (status === "loading" || !data || !isLoaded) {
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
        <RouteForm onSubmit={onSubmit} defaultData={data} />
      </FormProvider>
    </Page>
  );
};

export default EditRoutePage;
