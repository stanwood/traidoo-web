import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(3),
    },
    media: {
      height: "25vh",
    },
    actions: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  })
);

export default useStyles;
