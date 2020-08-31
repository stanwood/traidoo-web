import Box from "@material-ui/core/Box";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import RoutesMenu from "../../RoutesMenu";
import TraidooAppBar from "../AppBar";
import { appBarTabsHeight } from "../constants";
import ResponsiveDrawer from "../Drawers/Responsive";
import { tabs } from "../tabs";
import { LayoutProps } from "./interfaces";

const useLayoutStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    main: {
      flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
    tabs: {
      minHeight: appBarTabsHeight,
    },
  })
);

const LayoutE: React.FC<LayoutProps> = (props: LayoutProps) => {
  const classes = useLayoutStyles();
  const { children, activeTab } = props;

  return (
    <Box className={classes.root}>
      <TraidooAppBar
        cartButton={false}
        navButton="hamburger"
        navButtonResponsive={true}
        tabsItems={tabs.seller}
        activeTab={activeTab}
      />
      <ResponsiveDrawer anchor="left" withTabs={true}>
        <RoutesMenu />
      </ResponsiveDrawer>

      <main className={classes.main}>
        <div className={classes.toolbar} />
        <div className={classes.tabs} />
        {children}
      </main>
    </Box>
  );
};

export default LayoutE;
