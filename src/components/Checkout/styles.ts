import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    summary: {
      backgroundColor: theme.palette.background.default,
    },
    header: {
      padding: theme.spacing(2),
    },
    paper: {
      width: "100%",
    },
    selects: {
      padding: theme.spacing(2),
      backgroundColor: theme.palette.background.default,
    },
    actionButtons: {
      paddingTop: theme.spacing(3),
      backgroundColor: theme.palette.background.default,
      textAlign: "right",
    },
    proceed: {
      marginLeft: theme.spacing(2),
    },
    formControl: {
      width: "98%",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
    totalDelivery: {
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(2),
      textAlign: "right",
    },
    address: {
      display: "flex",
      justifyContent: "flex-end",
      [theme.breakpoints.down("sm")]: {
        marginTop: theme.spacing(2),
      },
    },
  })
);

export default useStyles;
