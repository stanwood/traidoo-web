import Drawer from "@material-ui/core/Drawer";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { useContext } from "react";
import { DrawerContext } from "../../../contexts/DrawerContext/context";
import {
  appBarTabsHeight,
  leftDrawerWidth,
  rightDrawerWidth,
} from "../constants";

const useTemporaryDrawerStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
    tabs: {
      minHeight: appBarTabsHeight,
    },
    leftDrawerPaper: {
      width: leftDrawerWidth,
      paddingTop: theme.spacing(3),
    },
    rightDrawerPaper: {
      width: rightDrawerWidth,
      paddingTop: theme.spacing(3),
    },
  })
);

export interface TemporaryDrawerProps {
  anchor: "left" | "right";
  withTabs: boolean;
  children: React.ReactNode;
}

const TemporaryDrawer: React.FC<TemporaryDrawerProps> = (
  props: TemporaryDrawerProps
) => {
  const classes = useTemporaryDrawerStyles();
  const {
    leftDrawer,
    toggleLeftDrawer,
    rightDrawer,
    toggleRightDrawer,
  } = useContext(DrawerContext);
  const { anchor, children, withTabs } = props;

  return (
    <nav aria-label="mailbox folders">
      <Drawer
        variant="temporary"
        anchor={anchor}
        open={anchor === "left" ? leftDrawer : rightDrawer}
        onClose={anchor === "left" ? toggleLeftDrawer : toggleRightDrawer}
        classes={{
          paper: clsx(
            anchor === "left" && classes.leftDrawerPaper,
            anchor === "right" && classes.rightDrawerPaper
          ),
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <div className={classes.toolbar} />
        {withTabs && <div className={classes.tabs} />}
        {children}
      </Drawer>
    </nav>
  );
};

export default TemporaryDrawer;
