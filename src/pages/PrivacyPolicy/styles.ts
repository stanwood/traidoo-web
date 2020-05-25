import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const usePrivacyPolicyStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
  })
);

export default usePrivacyPolicyStyles;
