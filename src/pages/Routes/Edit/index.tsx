import MuiAlert from "@material-ui/lab/Alert";
import Skeleton from "@material-ui/lab/Skeleton";
import { useLoadScript } from "@react-google-maps/api";
import React from "react";
import { useTranslation } from "react-i18next";
import { queryCache, useMutation, useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import { editRouteRequest, getRouteRequest } from "../../../api/queries/routes";
import Page from "../../../components/Common/Page";
import RouteForm from "../../../components/Routes/Form";
import Config from "../../../config";
import { RouteFormFields } from "../../../core/interfaces/routes/form";

const googleMapsLibraries = ["places"];

const EditRoutePage: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();

  const pageTitle = t("editRoute");

  const { id } = useParams<{ id: string }>();
  const routeId = Number(id);

  const [edit] = useMutation(editRouteRequest, {
    onSuccess: async () => {
      await queryCache.invalidateQueries(["route", routeId]);
      return;
    },
  });

  const { data, status } = useQuery(["route", routeId], getRouteRequest, {
    cacheTime: 1,
  });

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: Config.googleMapsApiKey,
    preventGoogleFontsLoading: true,
    libraries: googleMapsLibraries,
  });

  const onSubmit = async (data: RouteFormFields) => {
    const newData = {
      ...data,
      waypoints: data.waypoints
        ? data.waypoints.map((waypoint) => waypoint.name)
        : [],
    };
    const route = await edit({ id: Number(routeId), data: newData });
    if (route) history.push(`/seller/logistic/routes/${route.id}`);
  };

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
      <RouteForm onSubmit={onSubmit} defaultData={data} />
    </Page>
  );
};

export default EditRoutePage;
