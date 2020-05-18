import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const usePlacesFieldStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      color: theme.palette.text.secondary,
      marginRight: theme.spacing(2),
    },
  })
);

export default usePlacesFieldStyles;
