import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      objectFit: "cover",
      imageOrientation: "none",
      width: 200,
      height: 100,
      [theme.breakpoints.down("lg")]: {
        width: 150,
        height: 75,
      },
      [theme.breakpoints.down("sm")]: {
        width: 100,
        height: 50,
      },
    },
    imageLoader: {
      width: 200,
      height: 100,
      [theme.breakpoints.down("xl")]: {
        width: 150,
        height: 75,
      },
      [theme.breakpoints.down("sm")]: {
        width: 100,
        height: 50,
      },
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    mainLink: {
      fontWeight: 800,
      "&:hover": {
        color: theme.palette.primary.main,
      },
    },
    link: {
      "&:hover": {
        color: theme.palette.primary.main,
      },
    },
    alternatingRow: {
      background: "#fafafa",
    },
    imageCell: {
      lineHeight: 0,
      padding: 0,
    },
  })
);

export default useStyles;
