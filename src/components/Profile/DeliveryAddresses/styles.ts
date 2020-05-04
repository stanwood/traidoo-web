import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650
  },
  actions: {
    marginTop: theme.spacing(4)
  },
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  }
}));

export default useStyles;
