import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    summary: {
      backgroundColor: theme.palette.background.default,
    },
    actionButtons: {
      backgroundColor: theme.palette.background.default,
    },
    formControl: {
      width: "100%",
    },
    productName: {
      display: "flex",
      alignItems: "center",
    },
    delivery: {
      display: "flex",
      justifyContent: "flex-end",

      [theme.breakpoints.down("sm")]: {
        justifyContent: "flex-start",
        paddingTop: theme.spacing(2),
      },
    },
    item: {
      padding: theme.spacing(2),
    },
  })
);

export default useStyles;
