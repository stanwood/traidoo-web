import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { format, parseISO } from "date-fns";
import React from "react";
import { Order } from "../../core/interfaces/orders/ordersRequest";
import Documents from "./Documents";
import useTableListStyles from "./styles";

interface RowProps {
  order: Order;
  downloadFile: (documentId: number) => void;
}

const Row: React.FC<RowProps> = ({ order, downloadFile }: RowProps) => {
  const classes = useTableListStyles();

  const formatDate = (date: string): string => {
    return format(parseISO(date), "yyyy-MM-dd");
  };

  return (
    <TableRow key={order.id}>
      <TableCell>{order.id}</TableCell>
      <TableCell>{formatDate(order.createdAt)}</TableCell>
      <TableCell>{order.totalPrice}€</TableCell>
      <TableCell className={classes.files}>
        <Documents documents={order.documents} downloadFile={downloadFile} />
      </TableCell>
    </TableRow>
  );
};

export default Row;
