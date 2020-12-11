import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      marginBottom: theme.spacing(3),
    },
    imageContainer: {
      marginBottom: theme.spacing(3),
    },
    paperFullHeight: {
      padding: theme.spacing(2),
      height: "100%",
    },
    title: {
      marginBottom: theme.spacing(3),
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    formControl: {
      margin: theme.spacing(0),
      width: "100%",
    },
    input: {
      display: "none",
    },
    error: {
      color: "red",
      margin: 0,
      padding: 0,
      fontSize: "12px",
    },
    endAdornment: {
      "& fieldset": {
        border: 0,
      },
    },
    option: {
      fontSize: 15,
      "& > img": {
        marginRight: theme.spacing(1),
        width: "50px",
        height: "50px",
      },
    },
    imagePreview: {
      width: "100%",
    },
    actions: {
      marginTop: theme.spacing(4),
    },
    editButton: {
      marginLeft: theme.spacing(2),
    },
    thirdPartyDeliveryMessage: {
      marginTop: theme.spacing(2),
    },
  })
);

export default useStyles;
