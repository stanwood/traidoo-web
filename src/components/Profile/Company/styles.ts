import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  actions: {
    marginTop: theme.spacing(4),
  },
  editButton: {
    marginLeft: theme.spacing(2),
  },
  deliveryAddresses: {
    marginTop: theme.spacing(8),
  },
  checkbox: {
    display: "flex",
  },
  formControl: {
    width: "100%",
  },
}));

export default useStyles;
