import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { leftDrawerWidth } from "../../constants";

export const useDrawerLeftStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      zIndex: `${theme.zIndex.appBar - 1} !important` as any,
      [theme.breakpoints.up("xl")]: {
        width: leftDrawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      paddingBottom: theme.spacing(1),
      paddingTop: theme.spacing(1),
      width: leftDrawerWidth,
    },
  })
);
