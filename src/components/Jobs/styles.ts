import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useTableListStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: "right",
    },
    table: {
      minWidth: 650,
    },
    pagination: {
      textAlign: "right",
    },
    button: {
      marginBottom: theme.spacing(3),
    },
  })
);

export default useTableListStyles;
