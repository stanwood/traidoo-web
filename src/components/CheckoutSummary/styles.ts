import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      padding: theme.spacing(2),
    },
    table: {
      minWidth: 800,
      marginBottom: theme.spacing(6),
    },
    summary: {
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(2),
      width: "100%",
      margin: 0,
    },
    summaryLabel: {
      textTransform: "uppercase",
    },
    actionButtons: {
      padding: theme.spacing(2),
      backgroundColor: theme.palette.background.default,
      textAlign: "right",
    },
    button: {
      marginLeft: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    right: {
      textAlign: "right",
    },
  })
);

export default useStyles;
