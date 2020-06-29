import Box from "@material-ui/core/Box";
import { DirectionsRenderer, DirectionsService } from "@react-google-maps/api";
import React, { memo, useCallback, useMemo, useRef, useState } from "react";

interface RouteDirectionsProps {
  origin: string;
  destination: string;
  waypoints: { location: string }[];
}

export const RoutesDirections: React.FC<RouteDirectionsProps> = ({
  origin,
  destination,
  waypoints,
}: RouteDirectionsProps) => {
  const count = useRef(0);
  const [directions, setDirections] = useState<google.maps.DirectionsResult>();

  const directionsCallback = useCallback(
    (
      result: google.maps.DirectionsResult,
      status: google.maps.DirectionsStatus
    ) => {
      if (status === "OK" && count.current === 0) {
        count.current++;
        setDirections(result);
      }
    },
    []
  );

  const options = useMemo(
    () => ({
      destination: destination,
      origin: origin,
      waypoints: waypoints,
      travelMode: "DRIVING",
    }),
    [destination, origin, waypoints]
  );

  return (
    <Box>
      <DirectionsService options={options} callback={directionsCallback} />
      {directions && <DirectionsRenderer directions={directions} />}
    </Box>
  );
};

export const RoutesDirectionsMemo = memo(RoutesDirections);
