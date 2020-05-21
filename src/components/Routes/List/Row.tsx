import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { frequency } from "../frequency";

const Row = ({ route, onRouteDelete }: { route: any; onRouteDelete: any }) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const history = useHistory();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [anchorEl]
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [anchorEl]);

  const goToEditPage = useCallback(() => {
    setAnchorEl(null);
    history.push(`/seller/logistic/routes/${route.id}/edit`);
  }, [route.id]);

  const deleteRoute = useCallback(() => {
    setAnchorEl(null);
    onRouteDelete({ id: route.id });
  }, [route.id]);

  return (
    <TableRow key={route.id}>
      <TableCell>{route.origin}</TableCell>
      <TableCell>{route.destination}</TableCell>
      <TableCell>
        {route.frequency.map((day: any) => frequency[day]).join(", ")}
      </TableCell>
      <TableCell>
        {(route.length / 1000).toFixed(1)} {t("km")}
      </TableCell>
      <TableCell>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={goToEditPage}>{t("Edit")}</MenuItem>
          <MenuItem onClick={deleteRoute}>{t("Delete")}</MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  );
};

export default Row;
