import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      minHeight: "100%",
    },
    image: {
      objectFit: "cover",
      width: "100%",
      height: 300,
      [theme.breakpoints.down("sm")]: {
        height: 200,
      },
    },
    imageLoader: {
      width: "100%",
      height: 300,
      [theme.breakpoints.down("sm")]: {
        height: 200,
      },
    },
    subtitle: {
      textTransform: "uppercase",
      marginTop: theme.spacing(3),
    },
    marginBottom: {
      marginBottom: theme.spacing(3),
    },
    content: {
      padding: theme.spacing(3),
    },
    addToCart: {
      textTransform: "uppercase",
      width: "100%",
    },
    actions: {
      textAlign: "center",
      padding: theme.spacing(3),
    },
    propertyIcon: {
      marginRight: theme.spacing(1),
      fontSize: "1em",
    },
    category: {
      textTransform: "uppercase",
      marginBottom: theme.spacing(2),
    },
    bottom: {
      paddingTop: theme.spacing(6),
      marginTop: "auto",
    },
    editButton: {
      marginBottom: theme.spacing(2),
    },
  })
);

export default useStyles;
