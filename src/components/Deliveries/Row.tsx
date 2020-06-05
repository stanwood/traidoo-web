import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { format, parseISO } from "date-fns";
import React from "react";
import statusMapping from "../../core/utils/statusMapping";

interface RowProps {
  delivery: any;
}

const Row: React.FC<RowProps> = ({ delivery }: RowProps) => {
  const formatDate = (date: string): string => {
    return format(parseISO(date), "yyyy-dd-MM");
  };

  return (
    <TableRow key={delivery.id}>
      <TableCell>{delivery.id}</TableCell>
      <TableCell>{formatDate(delivery.createdAt)}</TableCell>
      <TableCell>{statusMapping[delivery.status]}</TableCell>
      <TableCell>{delivery.totalPrice}€</TableCell>
    </TableRow>
  );
};

export default Row;
