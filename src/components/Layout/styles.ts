import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useLayoutStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      overflow: "hidden",
    },
    toolbar: theme.mixins.toolbar,
    toolbarWithTabs: {
      minHeight: 128, // TODO: theme.mixins.toolbar.minHeight * 2?
    },
  })
);
