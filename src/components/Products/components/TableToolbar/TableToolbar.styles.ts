import {
  createStyles,

  makeStyles,
  Theme
} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      backgroundColor: "#f2f2f2" // TODO: add this color to theme settings
    },
    title: {
      flex: "1 1 100%"
    }
  })
);

export default useStyles;
