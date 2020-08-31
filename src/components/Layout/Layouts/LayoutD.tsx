import Box from "@material-ui/core/Box";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useContext, useMemo } from "react";
import { UserContext } from "../../../contexts/UserContext/context";
import TraidooAppBar from "../AppBar";
import { appBarTabsHeight } from "../constants";
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

const LayoutD: React.FC<LayoutProps> = (props: LayoutProps) => {
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
        cartButton={false}
        tabsItems={tabsItems}
        activeTab={activeTab}
      />

      <main className={classes.main}>
        <div className={classes.toolbar} />
        {Boolean(tabsItems) && <div className={classes.tabs} />}
        {children}
      </main>
    </Box>
  );
};

export default LayoutD;
