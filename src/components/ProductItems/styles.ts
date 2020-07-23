import { makeStyles } from "@material-ui/core/styles";

export const useProductItemsStyles = makeStyles((theme) => ({
  paper: {
    height: "100%",
    display: "grid",
    gridTemplateRows: "1fr auto",
  },
  actions: {
    padding: theme.spacing(2),
  },
  tableHead: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.common.black,
  },
  tableCell: {
    maxWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
}));

export const useAddItemDialogStyles = makeStyles((theme) => ({
  content: {
    overflowY: "hidden",
  },
  actions: {
    backgroundColor: theme.palette.background.default,
  },
}));
