import { DirectionsRenderer, DirectionsService } from "@react-google-maps/api";
import React, { memo, useCallback, useRef, useState } from "react";

export const RoutesDirections = ({
  origin,
  destination,
  waypoints,
}: {
  origin: string;
  destination: string;
  waypoints: string[];
}) => {
  const [directions, setDirections] = useState();
  const count = useRef(0);

  const directionsCallback = useCallback(
    (result: any, status: any) => {
      if (status === "OK" && count.current === 0) {
        count.current++;
        setDirections(result);
      }
    },
    [origin, destination, waypoints]
  );

  const options = {
    destination: destination,
    origin: origin,
    waypoints: waypoints,
    travelMode: "DRIVING",
  } as const;

  return (
    <>
      <DirectionsService options={options} callback={directionsCallback} />
      {directions && <DirectionsRenderer directions={directions} />}
    </>
  );
};

export const RoutesDirectionsMemo = memo(RoutesDirections);
