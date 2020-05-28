import Container from "@material-ui/core/Container";
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

interface DeliveriesListProps {
  deliveries: any;
  count: number;
  page: number;
  onPageChange: any;
}

const DeliveriesList: React.FC<DeliveriesListProps> = ({
  deliveries,
  count,
  page,
  onPageChange,
}: DeliveriesListProps) => {
  const classes = useTableListStyles();
  const { t } = useTranslation();

  return (
    <Container maxWidth="md" className={classes.root}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="routes table">
          <TableHead>
            <TableRow>
              <TableCell>{t("order")}</TableCell>
              <TableCell>{t("date")}</TableCell>
              <TableCell>{t("status")}</TableCell>
              <TableCell>{t("total")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deliveries.map((delivery: any) => (
              <Row key={delivery.id} delivery={delivery} />
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
    </Container>
  );
};

export default DeliveriesList;
