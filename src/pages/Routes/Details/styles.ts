import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useRouteDetailsStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650,
    },
    actions: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      "& > *": {
        margin: theme.spacing(1),
      },
      textAlign: "right",
    },
  })
);

export default useRouteDetailsStyles;
