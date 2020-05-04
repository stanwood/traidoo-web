import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {},
    image: {
      objectFit: "cover",
      width: 200,
      height: 100,
      [theme.breakpoints.down("sm")]: {
        width: 100,
        height: 50
      }
    },
    imageLoader: {
      width: 200,
      height: 100,
      [theme.breakpoints.down("sm")]: {
        width: 100,
        height: 50
      }
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2)
    },
    link: {
      "&:hover": {
        color: theme.palette.primary.main
      }
    }
  })
);

export default useStyles;
