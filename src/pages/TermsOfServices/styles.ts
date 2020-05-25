import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useTermsOfServicesStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
  })
);

export default useTermsOfServicesStyles;
