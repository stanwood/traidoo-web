import Box from "@material-ui/core/Box";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useContext, useMemo } from "react";
import { UserContext } from "../../../contexts/UserContext/context";
import RenderCart from "../../Cart/Root";
import Categories from "../../Categories";
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

const LayoutB: React.FC<LayoutProps> = (props: LayoutProps) => {
  const classes = useLayoutStyles();
  const { children, activeTab } = props;
  const { user, isSeller } = useContext(UserContext);

  const tabsItems = useMemo(() => {
    if (user.id && isSeller) {
      return tabs.seller;
    }

    return undefined;
  }, [user.id, isSeller]);

  return (
    <Box className={classes.root}>
      <TraidooAppBar
        cartButton={true}
        navButton="hamburger"
        navButtonResponsive={true}
        tabsItems={tabsItems}
        activeTab={activeTab}
      />
      <ResponsiveDrawer anchor="left" withTabs={Boolean(tabsItems)}>
        <Categories />
      </ResponsiveDrawer>
      <main className={classes.main}>
        <div className={classes.toolbar} />
        {Boolean(tabsItems) && <div className={classes.tabs} />}
        {children}
      </main>
      <ResponsiveDrawer anchor="right" withTabs={Boolean(tabsItems)}>
        <RenderCart />
      </ResponsiveDrawer>
    </Box>
  );
};

export default LayoutB;
