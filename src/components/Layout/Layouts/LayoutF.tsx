import Box from "@material-ui/core/Box";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
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

const LayoutF: React.FC<LayoutProps> = (props: LayoutProps) => {
  const classes = useLayoutStyles();
  const { children, activeTab } = props;

  return (
    <Box className={classes.root}>
      <TraidooAppBar
        cartButton={false}
        tabsItems={tabs.history}
        activeTab={activeTab}
        backButton={true}
      />
      <main className={classes.main}>
        <div className={classes.toolbar} />
        <div className={classes.tabs} />
        {children}
      </main>
    </Box>
  );
};

export default LayoutF;
