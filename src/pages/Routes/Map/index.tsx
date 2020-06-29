import MuiAlert from "@material-ui/lab/Alert";
import { GoogleMap } from "@react-google-maps/api";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { RoutesDirectionsMemo } from "./Directions";

const mapStyles = {
  height: "600px",
  width: "100%",
};

const mapCenter = {
  lat: 52.634,
  lng: 9.942744,
};

const RouteMap = ({ route, loadError }: { route: any; loadError: any }) => {
  const { t } = useTranslation();

  const mapOptions = {
    zoomControlOptions: {
      // @ts-ignore
      position: google.maps.ControlPosition.LEFT_BOTTOM,
    },
  } as const;

  if (loadError) {
    return (
      <MuiAlert severity="error" elevation={6} variant="filled">
        {t("mapLoadingError")}
      </MuiAlert>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={mapStyles}
      zoom={0}
      center={mapCenter}
      options={mapOptions}
    >
      <RoutesDirectionsMemo
        key={route.id}
        destination={route.destination}
        origin={route.origin}
        waypoints={route.waypoints.map((waypoint: string) => {
          return { location: waypoint };
        })}
      />
    </GoogleMap>
  );
};

export default memo(RouteMap);
