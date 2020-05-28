import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { format, parseISO } from "date-fns";
import React from "react";
import i18n from "../../i18n";

interface RowProps {
  delivery: any;
}

const statusMapping = {
  0: i18n.t("Cart"),
  1: i18n.t("Paid"),
  2: i18n.t("Ordered"),
};

const Row: React.FC<RowProps> = ({ delivery }: RowProps) => {
  const formatDate = (date: string): string => {
    return format(parseISO(date), "yyyy-dd-MM");
  };

  return (
    <TableRow key={delivery.id}>
      <TableCell>{delivery.id}</TableCell>
      <TableCell>{formatDate(delivery.createdAt)}</TableCell>
      <TableCell>{statusMapping[delivery.status]}</TableCell>
      <TableCell>{delivery.totalPrice}</TableCell>
    </TableRow>
  );
};

export default Row;
