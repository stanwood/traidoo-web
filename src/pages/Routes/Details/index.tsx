import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import MuiAlert from "@material-ui/lab/Alert";
import Skeleton from "@material-ui/lab/Skeleton";
import { useLoadScript } from "@react-google-maps/api";
import React, { useCallback } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { Link, useHistory, useParams } from "react-router-dom";
import { deleteRouteRequest, getRoute } from "../../../api/queries/routes";
import { frequency } from "../../../components/Routes/frequency";
import Config from "../../../config";
import RouteMap from "../Map";
import { useRouteDetailsStyles } from "./styles";

const googleMapsLibraries = ["places"];

const RouteDetailsPage: React.FC = () => {
  const { id: routeId } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const history = useHistory();
  const classes = useRouteDetailsStyles();
  const { data: routeData, status: routeStatus } = useQuery(
    ["/route", Number(routeId)],
    getRoute
  );

  const [routeDelete] = useMutation(deleteRouteRequest);

  const deleteRoute = useCallback(
    (id: number) => {
      routeDelete({ id }).then(() => history.push("/seller/logistic/routes"));
    },
    [routeDelete, history]
  );

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
        <title>{t("routeDetails")}</title>
      </Helmet>

      {!isLoaded || routeStatus === "loading" ? (
        Array.from(Array(10).keys()).map((number) => <Skeleton key={number} />)
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="routes table">
              <TableBody>
                <TableRow>
                  <TableCell>{t("Start")}</TableCell>
                  <TableCell>{routeData?.origin}</TableCell>
                </TableRow>
                {routeData?.waypoints.map((waypoint, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {t("Waypoint")} #{index + 1}
                    </TableCell>
                    <TableCell>{waypoint}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell>{t("End")}</TableCell>
                  <TableCell>{routeData?.destination}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t("Frequency")}</TableCell>
                  <TableCell>
                    {routeData?.frequency
                      .map((day: any) => frequency[day])
                      .join(", ")}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t("Length")}</TableCell>
                  <TableCell>
                    {(routeData?.length / 1000).toFixed(1)} {t("km")}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box className={classes.actions}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={`/seller/logistic/routes/${routeData.id}/edit`}
            >
              {t("Edit")}
            </Button>
            <Button
              variant="contained"
              onClick={() => deleteRoute(routeData.id)}
            >
              {t("Delete")}
            </Button>
          </Box>
          <RouteMap route={routeData} loadError={loadError} />
        </>
      )}
    </>
  );
};

export default RouteDetailsPage;
