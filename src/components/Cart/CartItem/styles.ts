import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cartItem: {
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(2)
    },
    title: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    },
    removeButton: {
      textAlign: "right"
    }
  })
);

export default useStyles;
