import MuiAlert from "@material-ui/lab/Alert";
import Skeleton from "@material-ui/lab/Skeleton";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import React from "react";
import { useTranslation } from "react-i18next";
import Config from "../../../config";
import { RoutesDirectionsMemo } from "./Directions";

const mapStyles = {
  height: "600px",
  width: "100%",
};

const mapCenter = {
  lat: 52.634,
  lng: 9.942744,
};

const googleMapsLibraries = ["places"];

const RoutesMap = ({ routes }: { routes: any }) => {
  const { t } = useTranslation();
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
    <GoogleMap mapContainerStyle={mapStyles} zoom={0} center={mapCenter}>
      {routes.map((route: any) => (
        <RoutesDirectionsMemo
          key={route.id}
          destination={route.destination}
          origin={route.origin}
          waypoints={route.waypoints.map((waypoint: string) => {
            return { location: waypoint };
          })}
        />
      ))}
    </GoogleMap>
  );
};

export default RoutesMap;
