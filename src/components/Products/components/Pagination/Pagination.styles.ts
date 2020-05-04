import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const paginationStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5)
    }
  })
);

export default paginationStyles;
