import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { format, parseISO } from "date-fns";
import React from "react";
import i18n from "../../i18n";

interface RowProps {
  order: any;
}

const statusMapping = {
  0: i18n.t("Cart"),
  1: i18n.t("Paid"),
  2: i18n.t("Ordered"),
};

const Row: React.FC<RowProps> = ({ order }: RowProps) => {
  const formatDate = (date: string): string => {
    return format(parseISO(date), "yyyy-dd-MM");
  };

  return (
    <TableRow key={order.id}>
      <TableCell>{order.id}</TableCell>
      <TableCell>{formatDate(order.createdAt)}</TableCell>
      <TableCell>{statusMapping[order.status]}</TableCell>
      <TableCell>{order.totalPrice}€</TableCell>
    </TableRow>
  );
};

export default Row;
