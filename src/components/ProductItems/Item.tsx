import IconButton from "@material-ui/core/IconButton";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import ClearIcon from "@material-ui/icons/Clear";
import React from "react";

const ProductItem = ({ item, onDelete }: { item: any; onDelete: any }) => {
  return (
    <TableRow key={item.id} data-testid="product-item">
      <TableCell data-testid="product-item-quantity">{item.quantity}</TableCell>
      <TableCell data-testid="product-item-latest-delivery-date" align="right">
        {item.latestDeliveryDate}
        <IconButton
          aria-label="delete"
          onClick={() =>
            onDelete({ productId: item.product.id, itemId: item.id })
          }
          data-testid="product-item-delete-button"
        >
          <ClearIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default ProductItem;
