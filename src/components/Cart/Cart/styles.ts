import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { rightDrawerWidth } from "../../Layout/constants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: rightDrawerWidth - 1,
    },
    title: {
      padding: theme.spacing(2),
    },
  })
);

export default useStyles;
