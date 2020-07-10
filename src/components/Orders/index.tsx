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
import { Order } from "../../core/interfaces/orders/ordersRequest";
import Row from "./Row";
import useTableListStyles from "./styles";

interface OrderListProps {
  orders: Order[] | undefined;
  count: number;
  page: number;
  displayBuyer: boolean;
  onPageChange: (page: number) => void;
  downloadFile: (documentId: number) => void;
}

const tableRowsPerPageOptions:
  | (number | { value: number; label: string })[]
  | undefined = [];

const OrdersList: React.FC<OrderListProps> = ({
  orders,
  count,
  page,
  displayBuyer,
  onPageChange,
  downloadFile,
}: OrderListProps) => {
  const classes = useTableListStyles();
  const { t } = useTranslation();

  return (
    <Container maxWidth="md" className={classes.root}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="routes table">
          <TableHead>
            <TableRow>
              <TableCell>{t("id")}</TableCell>
              <TableCell>{t("date")}</TableCell>
              <TableCell>{t("total")}</TableCell>
              {displayBuyer && <TableCell>{t("buyer")}</TableCell>}
              <TableCell>{t("documents")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((order) => (
              <Row
                key={order.id}
                order={order}
                downloadFile={downloadFile}
                displayBuyer={displayBuyer}
              />
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={tableRowsPerPageOptions}
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

export default OrdersList;
