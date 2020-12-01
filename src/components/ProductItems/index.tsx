import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import AddItemDialog from "../../contexts/AddProductItemsContext/AddItemDialog";
import { AddProductItemsContext } from "../../contexts/AddProductItemsContext/context";
import ProductItem from "./Item";
import { useProductItemsStyles } from "./styles";

interface ProductItemsProps {
  productId: number;
  items: any;
  refreshItems: () => void;
  onDelete: ({
    productId,
    itemId,
  }: {
    productId: number;
    itemId: number;
  }) => Promise<any>;
}

const ProductItems: React.FC<ProductItemsProps> = (
  props: ProductItemsProps
) => {
  const classes = useProductItemsStyles();
  const { t } = useTranslation();
  const { open } = useContext(AddProductItemsContext);
  const { productId, items, refreshItems, onDelete } = props;

  return (
    <Paper className={classes.paper}>
      <TableContainer>
        <Table aria-label="items">
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell>
                <Typography>{t("availableItems")}</Typography>
              </TableCell>
              <TableCell className={classes.tableCell} align="right">
                <Typography noWrap>{t("bestBefore")}</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item: any) => (
              <ProductItem
                key={item.id}
                productId={productId}
                item={item}
                onDelete={onDelete}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className={classes.actions}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          data-testid="add-items-button"
          onClick={() => open(productId)}
        >
          {t("addItems")}
        </Button>
      </Box>
      <AddItemDialog onSuccess={refreshItems} />
    </Paper>
  );
};

export default ProductItems;
