import Box from "@material-ui/core/Box";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useContext, useMemo } from "react";
import { UserContext } from "../../../contexts/UserContext/context";
import RenderCart from "../../Cart/Root";
import Categories from "../../Categories";
import TraidooAppBar from "../AppBar";
import { appBarTabsHeight } from "../constants";
import TemporaryDrawer from "../Drawers/Temporary";
import { tabs } from "../tabs";
import { LayoutProps } from "./interfaces";

const useLayoutStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      height: "100%",
    },
    main: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
    tabs: {
      minHeight: appBarTabsHeight,
    },
  })
);

const LayoutC: React.FC<LayoutProps> = (props: LayoutProps) => {
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
        navButtonResponsive={false}
        tabsItems={tabsItems}
        activeTab={activeTab}
      />
      <TemporaryDrawer anchor="left" withTabs={Boolean(tabsItems)}>
        <Categories />
      </TemporaryDrawer>
      <main className={classes.main}>
        <div className={classes.toolbar} />
        {Boolean(tabsItems) && <div className={classes.tabs} />}
        {children}
      </main>
      <TemporaryDrawer anchor="right" withTabs={Boolean(tabsItems)}>
        <RenderCart />
      </TemporaryDrawer>
    </Box>
  );
};

export default LayoutC;
