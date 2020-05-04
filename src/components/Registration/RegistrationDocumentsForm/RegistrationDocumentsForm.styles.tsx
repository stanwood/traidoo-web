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
    margin: theme.spacing(2)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  input: {
    display: "None"
  },
  button: {},
  actionButtons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  formTitle: {
    display: "flex",
    justifyContent: "flex-start",
    width: "100%"
  },
  error: {
    color: "red",
    margin: 0,
    padding: 0,
    fontSize: "12px"
  }
}));

export default useStyles;
