import { Hidden } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import React, { useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../../../contexts/UserContext/context";
import { TableColumns, TableHeadCell, TableProps } from "../../interfaces";
import { Order } from "../../types";
import { anoynmousHeadCells, headCells, sellerHeadCells } from "./cells";
import useStyles from "./TableHead.styles";

const TableHeader = (props: TableProps) => {
  const classes = useStyles();
  const { canBuy } = useContext(UserContext);
  const { t } = useTranslation();
  const location = useLocation();
  const { order, orderBy, onRequestSort } = props;
  const sortHandler = (property: keyof TableColumns) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };

  const cells = useMemo(() => {
    if (location.pathname.startsWith("/seller/")) {
      return sellerHeadCells;
    } else if (canBuy) {
      return headCells;
    } else {
      return anoynmousHeadCells;
    }
  }, [canBuy, location.pathname]);

  // TODO: move CustomTableCellProps and CustomTableCell to separate files
  interface CustomTableCellProps {
    data: TableHeadCell;
    order: Order;
    orderBy: string;
    classes: any;
    sortHandler: any;
  }

  const CustomTableCell = (props: CustomTableCellProps) => {
    const { id, align, disablePadding, sortable, label } = props.data;
    const { classes, order, orderBy, sortHandler } = props;

    return (
      <TableCell
        align={align}
        padding={disablePadding ? "none" : "default"}
        sortDirection={orderBy === id ? order : false}
      >
        {sortable ? (
          <TableSortLabel
            active={orderBy === id}
            direction={orderBy === id ? order : "asc"}
            onClick={sortHandler(id)}
          >
            {label}
            {orderBy === id ? (
              <span className={classes.visuallyHidden}>
                {order === "desc"
                  ? t("sortedDescending")
                  : t("sortedAscending")}
              </span>
            ) : null}
          </TableSortLabel>
        ) : (
          label
        )}
      </TableCell>
    );
  };

  return (
    <TableHead>
      <TableRow>
        {cells?.map((cell: any) =>
          cell.hideOnMobile ? (
            <Hidden smDown key={cell.id}>
              <CustomTableCell
                data={cell}
                order={order}
                orderBy={orderBy}
                classes={classes}
                sortHandler={sortHandler}
              />
            </Hidden>
          ) : (
            <CustomTableCell
              key={cell.id}
              data={cell}
              order={order}
              orderBy={orderBy}
              classes={classes}
              sortHandler={sortHandler}
            />
          )
        )}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
