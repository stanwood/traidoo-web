import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { leftDrawerWidth } from "../Layout/constants";

export const useCategoriesStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: leftDrawerWidth - 1,
      paddingBottom: theme.spacing(2),
    },
    treeView: {
      marginBottom: theme.spacing(4),
      width: "100%",
    },
    logos: {
      marginTop: "auto",
    },
    image: {
      display: "block",
      margin: "0 auto",
      height: "auto",
      maxHeight: "78px",
      width: "auto",
      maxWidth: "100%",
      marginBottom: theme.spacing(1),
    },
  })
);

export const useCategoriesTreeItemStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.text.secondary,
    },
    content: {
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightMedium,
      "$expanded > &": {
        fontWeight: theme.typography.fontWeightRegular,
      },
      padding: theme.spacing(1),
      flexDirection: "row-reverse",
    },
    expanded: {},
    group: {
      marginLeft: 0,
      "& $content": {
        paddingLeft: theme.spacing(2),
      },
    },
    selected: {
      backgroundColor: theme.palette.action.hover,
    },
    label: {
      fontWeight: "inherit",
      color: "inherit",
    },
  })
);
