import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useCartStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      flexGrow: 1,
    },
    actionButtons: {
      textAlign: "right",
      padding: theme.spacing(3),
    },
    actionDivider: {
      marginBottom: theme.spacing(2),
    },
    actionLeftButton: {
      marginRight: theme.spacing(2),
    },
  })
);
