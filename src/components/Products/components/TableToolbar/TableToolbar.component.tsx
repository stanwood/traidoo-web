import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import FilterMenu from "../Filter";
import TableToolbarProps from "./interfaces";
import useStyles from "./TableToolbar.styles";

const TableToolbar = (props: TableToolbarProps) => {
  const classes = useStyles();
  const { filterBy, onFilterChange } = props;
  const { t } = useTranslation();

  return (
    <Toolbar className={classes.root}>
      <Typography className={classes.title} variant="h6" id="tableTitle">
        {t("products")}
      </Typography>
      <FilterMenu onFilterChange={onFilterChange} selected={filterBy} />
    </Toolbar>
  );
};

export default TableToolbar;
