import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexDirection: "row",
      height: "100%",
      margin: 0,
      padding: 0,
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },
    paper: {
      minHeight: "100%",
    },
    details: {
      backgroundColor: theme.palette.grey[100],
      width: 312,
      minWidth: 312,
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
    description: {
      flexGrow: 1,
    },
    productsList: {
      padding: theme.spacing(2),
    },
  })
);

export default useStyles;
