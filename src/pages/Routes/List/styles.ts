import { makeStyles } from "@material-ui/core/styles";

const useRouteListStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default useRouteListStyles;
