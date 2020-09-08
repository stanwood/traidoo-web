import IconButton from "@material-ui/core/IconButton";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { frequencyMapping } from "../frequency";

const Row = ({ route }: { route: any }) => {
  const { t } = useTranslation();

  return (
    <TableRow key={route.id}>
      <TableCell>{route.origin}</TableCell>
      <TableCell>{route.destination}</TableCell>
      <TableCell>
        {route.frequency.map((day: any) => frequencyMapping[day]).join(", ")}
      </TableCell>
      <TableCell>
        {(route.length / 1000).toFixed(1)} {t("km")}
      </TableCell>
      <TableCell>
        <IconButton
          aria-label="details"
          component={Link}
          to={`/seller/logistic/routes/${route.id}`}
        >
          <ArrowForwardIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default Row;
