import Box from "@material-ui/core/Box";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import TraidooAppBar from "../AppBar";
import { LayoutProps } from "./interfaces";

const useLayoutStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
  })
);

const LayoutH: React.FC<LayoutProps> = (props: LayoutProps) => {
  const classes = useLayoutStyles();
  const { children } = props;

  return (
    <Box>
      <TraidooAppBar cartButton={false} backButton={false} />
      <main className={classes.main}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </Box>
  );
};

export default LayoutH;
