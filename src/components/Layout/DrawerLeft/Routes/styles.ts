import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { leftDrawerWidth } from "../../constants";

const useRouteMenuStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up("lg")]: {
        width: leftDrawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      paddingBottom: theme.spacing(1),
      paddingTop: 128,
      width: leftDrawerWidth,
    },
    toolbar: theme.mixins.toolbar,
  })
);

export default useRouteMenuStyles;
