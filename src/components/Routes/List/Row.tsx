import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React from "react";
import { useTranslation } from "react-i18next";
import { frequency } from "../frequency";

const Row = ({ route }: { route: any }) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <TableRow key={route.id}>
      <TableCell>{route.origin}</TableCell>
      <TableCell>{route.destination}</TableCell>
      <TableCell>
        {route.frequency.map((day: any) => frequency[day]).join(", ")}
      </TableCell>
      <TableCell>
        {route.length} {t("km")}
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
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>{t("Edit")}</MenuItem>
          <MenuItem onClick={handleClose}>{t("Delete")}</MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  );
};

export default Row;
