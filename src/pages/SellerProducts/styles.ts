import { makeStyles } from "@material-ui/core/styles";
import Config from "../../config";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: Config.intercomId ? theme.spacing(11) : theme.spacing(2),
    right: "22px", // aligned with the Intercom widget
  },
}));

export default useStyles;
