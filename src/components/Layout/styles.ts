import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useLayoutStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    content: {
      flexGrow: 1,
      overflow: "hidden",
    },
    toolbar: theme.mixins.toolbar,
    toolbarWithTabs: {
      minHeight: theme.mixins.toolbar.minHeight * 2,
      [theme.breakpoints.down("sm")]: {
        minHeight: theme.mixins.toolbar.minHeight * 2 - 8,
      },
    },
  })
);
