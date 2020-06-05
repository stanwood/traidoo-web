import MuiAlert from "@material-ui/lab/Alert";
import Skeleton from "@material-ui/lab/Skeleton";
import { useLoadScript } from "@react-google-maps/api";
import React from "react";
import { Helmet } from "react-helmet";
import { FormContext, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import { editRoute, getRoute } from "../../../api/queries/routes";
import RouteForm from "../../../components/Routes/Form";
import Config from "../../../config";
import routesAddValidationSchema from "./validation";

const googleMapsLibraries = ["places"];

const EditRoutePage = () => {
  const history = useHistory();
  const { id: routeId } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const form = useForm({
    validationSchema: routesAddValidationSchema,
  });
  const { data: routeData, status: routeStatus } = useQuery(
    ["/route", Number(routeId)],
    getRoute,
    {
      cacheTime: 1,
      onSuccess: (data) => {
        form.setValue([
          { origin: data?.origin },
          { destination: data?.destination },
          { waypoints: data?.waypoints },
          { frequency: data?.frequency },
        ]);
      },
    }
  );
  const [edit] = useMutation(editRoute);
  const onSubmit = (data: any) => {
    edit({ id: Number(routeId), data }).then(() =>
      history.push("/seller/logistic/routes")
    );
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

  return (
    <>
      <Helmet>
        <title>{t("editRoute")}</title>
      </Helmet>

      {!isLoaded || routeStatus === "loading" ? (
        Array.from(Array(10).keys()).map((number) => <Skeleton key={number} />)
      ) : (
        <FormContext {...form}>
          <RouteForm onSubmit={onSubmit} defaultData={routeData} />
        </FormContext>
      )}
    </>
  );
};

export default EditRoutePage;
