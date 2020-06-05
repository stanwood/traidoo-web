import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useOrderDetailsStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(2),
    },
    pageTitle: {
      paddingLeft: theme.spacing(2),
    },
    data: {
      marginTop: theme.spacing(6),
    },
    summary: {
      marginTop: theme.spacing(6),
      "& *": {
        textTransform: "uppercase",
      },
    },
    boldText: {
      fontWeight: "bold",
    },
    secondaryText: {
      color: theme.palette.text.secondary,
    },
    info: {
      maxWidth: theme.breakpoints.values.xs,
    },
    infoTitle: {
      borderBottom: "none",
      color: theme.palette.text.secondary,
      textTransform: "uppercase",
    },
    infoValue: {
      textTransform: "uppercase",
      borderBottom: "none",
    },
    actions: {
      paddingBottom: theme.spacing(6),
      paddingTop: theme.spacing(6),
      textAlign: "right",
    },
  })
);

export default useOrderDetailsStyles;
