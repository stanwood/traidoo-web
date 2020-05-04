import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { rightDrawerWidth } from "../constants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    grid: {
      flexGrow: 1
    },
    actionButtons: {
      textAlign: "right",
      padding: theme.spacing(3)
    },
    actionDivider: {
      marginBottom: theme.spacing(2)
    },
    actionLeftButton: {
      marginRight: theme.spacing(2)
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    drawer: {
      width: rightDrawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: rightDrawerWidth
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    toolbar: theme.mixins.toolbar
  })
);

export default useStyles;
