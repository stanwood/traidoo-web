import Link from "@material-ui/core/Link";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { format, parseISO } from "date-fns";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import statusMapping from "../../core/utils/statusMapping";

interface RowProps {
  order: any;
}

const Row: React.FC<RowProps> = ({ order }: RowProps) => {
  const formatDate = (date: string): string => {
    return format(parseISO(date), "yyyy-dd-MM");
  };

  return (
    <TableRow key={order.id}>
      <TableCell>
        <Link component={RouterLink} to={`/history/orders/${order.id}`}>
          {order.id}
        </Link>
      </TableCell>
      <TableCell>{formatDate(order.createdAt)}</TableCell>
      <TableCell>{statusMapping[order.status]}</TableCell>
      <TableCell>{order.totalPrice}€</TableCell>
    </TableRow>
  );
};

export default Row;
