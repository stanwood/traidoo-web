import { Hidden } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import React from "react";
import RoutesMenu from "./RoutesMenu";

const RoutesDrawer = ({ open }: { open: boolean }) => {
  return (
    <Box>
      <Hidden xlUp implementation="css">
        <RoutesMenu open={open} variant="persistent" />
      </Hidden>
      <Hidden lgDown implementation="css">
        <RoutesMenu open={open} variant="permanent" />
      </Hidden>
    </Box>
  );
};

export default RoutesDrawer;
