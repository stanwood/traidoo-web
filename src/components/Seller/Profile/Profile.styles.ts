import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      objectFit: "cover",
      width: "100%",
      height: 400,
      [theme.breakpoints.down("sm")]: {
        height: 300
      }
    },
    imageLoader: {
      width: "100%",
      height: 400,
      [theme.breakpoints.down("sm")]: {
        height: 300
      }
    },
    marginBottom: {
      marginBottom: theme.spacing(3)
    },
    content: {
      padding: theme.spacing(3)
    }
  })
);

export default useStyles;
