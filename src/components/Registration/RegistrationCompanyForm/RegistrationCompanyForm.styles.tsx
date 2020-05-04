import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  formControl: {
    margin: theme.spacing(0),
    width: "100%"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  actionButtons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  formTitle: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start"
  }
}));

export default useStyles;
