import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    hello: {
      marginBottom: theme.spacing(3)
    }
  })
);

export default useStyles;
