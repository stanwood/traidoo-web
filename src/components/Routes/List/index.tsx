import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import { useTranslation } from "react-i18next";
import Row from "./Row";
import useTableListStyles from "./styles";

const RoutesList = ({
  routes,
  count,
  page,
  onPageChange,
  onRouteDelete,
}: {
  routes: any;
  count: number;
  page: number;
  onPageChange: any;
  onRouteDelete: any;
}) => {
  const classes = useTableListStyles();
  const { t } = useTranslation();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="routes table">
        <TableHead>
          <TableRow>
            <TableCell>{t("Start")}</TableCell>
            <TableCell>{t("End")}</TableCell>
            <TableCell>{t("Frequency")}</TableCell>
            <TableCell>{t("Length")}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {routes.map((route: any) => (
            <Row key={route.id} route={route} onRouteDelete={onRouteDelete} />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={count}
        rowsPerPage={10}
        onChangePage={(event: any, page: number) => onPageChange(page)}
        page={page}
        className={classes.pagination}
      />
    </TableContainer>
  );
};

export default RoutesList;
