import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useAddRouteStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      marginBottom: theme.spacing(3),
    },
    title: {
      marginBottom: theme.spacing(3),
    },
    nextSection: {
      marginTop: theme.spacing(5),
    },
    frequencyErrorMessage: {
      display: "block",
      color: theme.palette.error.main,
    },
    button: {
      marginTop: theme.spacing(3),
    },
    actions: {
      marginTop: theme.spacing(4),
    },
    saveButton: {
      marginLeft: theme.spacing(2),
    },
    icon: {
      color: theme.palette.text.secondary,
      marginRight: theme.spacing(2),
    },
    removeIcon: {
      textAlign: "center",
    },
  })
);

export default useAddRouteStyles;
