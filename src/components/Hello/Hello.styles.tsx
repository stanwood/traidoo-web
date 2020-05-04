import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    media: {
      height: "25vh"
    },
    actions: {
      backgroundColor: theme.palette.background.default,
      "& > *": {
        margin: theme.spacing(1)
      }
    }
  })
);

export default useStyles;
