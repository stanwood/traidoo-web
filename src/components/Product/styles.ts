import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useProductDetailsStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexDirection: "row",
      margin: 0,
      padding: 0,
      height: "100%",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
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
      padding: theme.spacing(6),
    },
    sideBar: {
      padding: theme.spacing(2),
    },
    addToCart: {
      textTransform: "uppercase",
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      width: 312 - theme.spacing(2) * 2,
      [theme.breakpoints.down("sm")]: {
        width: "90%",
        left: "50%",
        transform: "translateX(-50%)",
      },
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
    details: {
      backgroundColor: theme.palette.grey[100],
      width: 312,
      minWidth: 312,
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
    description: {
      flexGrow: 1,
    },
    productDescription: {
      whiteSpace: "pre-line",
    },
  })
);

export default useProductDetailsStyles;
