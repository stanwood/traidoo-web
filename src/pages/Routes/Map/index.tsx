import MuiAlert from "@material-ui/lab/Alert";
import { GoogleMap } from "@react-google-maps/api";
import React, { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Route } from "../../../core/interfaces/routes";
import { RoutesDirectionsMemo } from "./Directions";
import { mapStyles } from "./styles";

const mapCenter = {
  lat: 52.634,
  lng: 9.942744,
};

const RouteMap = ({ route, loadError }: { route: Route; loadError: any }) => {
  const { t } = useTranslation();

  const mapOptions = useMemo(
    () => ({
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM,
      },
    }),
    []
  );

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
        waypoints={route.waypoints.map((waypoint) => ({ location: waypoint }))}
      />
    </GoogleMap>
  );
};

export default memo(RouteMap);
