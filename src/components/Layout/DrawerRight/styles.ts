import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { rightDrawerWidth } from "../constants";

export const useDrawerRightStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      zIndex: `${theme.zIndex.appBar - 1} !important` as any,
      [theme.breakpoints.up("xl")]: {
        width: rightDrawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: rightDrawerWidth,
      overflowX: "hidden",
    },
  })
);

export const useCartStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      flexGrow: 1,
    },
    actionButtons: {
      textAlign: "right",
      padding: theme.spacing(3),
    },
    actionDivider: {
      marginBottom: theme.spacing(2),
    },
    actionLeftButton: {
      marginRight: theme.spacing(2),
    },
  })
);
