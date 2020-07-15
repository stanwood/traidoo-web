import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FlightLandIcon from "@material-ui/icons/FlightLand";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import RoomIcon from "@material-ui/icons/Room";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const RoutesMenu: React.FC = () => {
  const { t } = useTranslation();

  return (
    <List>
      <ListItem button component={Link} to="/seller/logistic/routes">
        <ListItemIcon>
          <RoomIcon />
        </ListItemIcon>
        <ListItemText primary={t("myRoutes")} />
      </ListItem>
      <ListItem button component={Link} to="/seller/logistic/jobs">
        <ListItemIcon>
          <FlightTakeoffIcon />
        </ListItemIcon>
        <ListItemText primary={t("availableJobs")} />
      </ListItem>
      <ListItem button component={Link} to="/seller/logistic/jobs?my=1">
        <ListItemIcon>
          <FlightLandIcon />
        </ListItemIcon>
        <ListItemText primary={t("myJobs")} />
      </ListItem>
    </List>
  );
};

export default RoutesMenu;
