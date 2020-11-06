import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { format, parseISO } from "date-fns";
import React from "react";
import { useTranslation } from "react-i18next";
import { getCurrencySymbol } from "../../core/constants/currencies";
import { Order, OrderBuyer } from "../../core/interfaces/orders/ordersRequest";
import Documents from "./Documents";
import useTableListStyles from "./styles";

interface RowProps {
  order: Order;
  downloadFile: (documentId: number) => void;
  displayBuyer: boolean;
}

const Row: React.FC<RowProps> = ({
  order,
  downloadFile,
  displayBuyer,
}: RowProps) => {
  const classes = useTableListStyles();
  const { t } = useTranslation();

  const formatDate = (date: string): string => {
    return format(parseISO(date), "yyyy-MM-dd");
  };

  const buyer = (buyer: OrderBuyer | undefined) => {
    if (buyer) {
      return (
        <Typography>
          {buyer?.firstName} {buyer?.lastName}, {buyer?.companyName}
        </Typography>
      );
    }
  };

  return (
    <TableRow key={order.id}>
      <TableCell>{order.id}</TableCell>
      <TableCell>{formatDate(order.createdAt)}</TableCell>
      <TableCell>
        {order.documents.length > 0
          ? `${order.totalPrice}${getCurrencySymbol()}`
          : t("N/A")}
      </TableCell>
      {displayBuyer && <TableCell>{buyer(order.buyer)}</TableCell>}
      <TableCell className={classes.files}>
        <Documents documents={order.documents} downloadFile={downloadFile} />
      </TableCell>
    </TableRow>
  );
};

export default Row;
