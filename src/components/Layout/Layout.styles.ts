import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { leftDrawerWidth } from "./constants";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    contentPadding: {
      [theme.breakpoints.up("xl")]: {
        marginLeft: leftDrawerWidth,
      },
    },
    close: {
      padding: theme.spacing(0.5),
    },
    toolbar: theme.mixins.toolbar,
    toolbarWithTabs: {
      minHeight: 128, // TODO: theme.mixins.toolbar.minHeight * 2?
    },
  })
);
