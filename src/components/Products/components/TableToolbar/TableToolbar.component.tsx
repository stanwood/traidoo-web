import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import ClearIcon from "@material-ui/icons/Clear";
import clsx from "clsx";
import React from "react";
import { useTranslation } from "react-i18next";
import FilterMenu from "../Filter";
import menuItems from "../Filter/menuItems";
import TableToolbarProps from "./interfaces";
import useStyles from "./TableToolbar.styles";

const TableToolbar = (props: TableToolbarProps) => {
  const classes = useStyles();
  const { filterBy, onFilterChange } = props;
  const { t } = useTranslation();
  const filter = menuItems.find((item) => item.value === filterBy)?.name;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: filterBy,
      })}
    >
      {filterBy ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
        >
          {filter}
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
          {t("products")}
        </Typography>
      )}
      {filterBy ? (
        <Tooltip title="Remove filter">
          <IconButton
            aria-label="remove filter"
            onClick={() => onFilterChange("")}
          >
            <ClearIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <FilterMenu onFilterChange={onFilterChange} />
      )}
    </Toolbar>
  );
};

export default TableToolbar;
