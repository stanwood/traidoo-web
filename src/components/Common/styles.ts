import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const usePageStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    padding: {
      padding: theme.spacing(3),
    },
  })
);

export default usePageStyles;
