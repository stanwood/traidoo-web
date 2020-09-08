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
import { useTranslation } from "react-i18next";
import { queryCache, useMutation, useQuery } from "react-query";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  deleteRouteRequest,
  getRouteRequest,
} from "../../../api/queries/routes";
import Page from "../../../components/Common/Page";
import { frequencyMapping } from "../../../components/Routes/frequency";
import Config from "../../../config";
import RouteMap from "../Map";
import { useRouteDetailsStyles } from "./styles";

const googleMapsLibraries = ["places"];

const RouteDetailsPage: React.FC = () => {
  const classes = useRouteDetailsStyles();
  const history = useHistory();
  const { id: routeId } = useParams<{ id: string }>();

  const { t } = useTranslation();
  const { pageTitle } = t("routeDetails");

  const { data, status } = useQuery(
    ["route", Number(routeId)],
    getRouteRequest
  );

  const [routeDelete] = useMutation(deleteRouteRequest, {
    onSuccess: () =>
      queryCache.invalidateQueries((query) => query.queryKey[0] === "routes"),
  });

  const deleteRoute = useCallback(async () => {
    await routeDelete({ id: Number(routeId) });
    history.push("/seller/logistic/routes");
  }, [routeDelete, history, routeId]);

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
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="routes table">
          <TableBody>
            <TableRow>
              <TableCell>{t("Start")}</TableCell>
              <TableCell>{data.origin}</TableCell>
            </TableRow>
            {data?.waypoints.map((waypoint, index) => (
              <TableRow key={index}>
                <TableCell>
                  {t("Waypoint")} #{index + 1}
                </TableCell>
                <TableCell>{waypoint}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>{t("End")}</TableCell>
              <TableCell>{data.destination}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{t("Frequency")}</TableCell>
              <TableCell>
                {data.frequency.map((day) => frequencyMapping[day]).join(", ")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{t("Length")}</TableCell>
              <TableCell>
                {(data.length / 1000).toFixed(1)} {t("km")}
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
          to={`/seller/logistic/routes/${data.id}/edit`}
        >
          {t("Edit")}
        </Button>
        <Button variant="contained" onClick={deleteRoute}>
          {t("Delete")}
        </Button>
      </Box>
      <RouteMap route={data} loadError={loadError} />
    </Page>
  );
};

export default RouteDetailsPage;
