import IconButton from "@material-ui/core/IconButton";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";
import { AddProductItemsContext } from "../../contexts/AddProductItemsContext/context";

const ProductItem = ({
  productId,
  item,
  onDelete,
}: {
  productId: number;
  item: any;
  onDelete: any;
}) => {
  const { open } = React.useContext(AddProductItemsContext);

  return (
    <TableRow key={item.id} data-testid="product-item">
      <TableCell data-testid="product-item-quantity">
        {item.quantity}
        <IconButton
          aria-label="edit"
          onClick={() =>
            open(productId, item.id, item.quantity, item.latestDeliveryDate)
          }
          data-testid="product-item-edit-button"
        >
          <EditIcon />
        </IconButton>
      </TableCell>
      <TableCell data-testid="product-item-latest-delivery-date" align="right">
        {item.latestDeliveryDate}
        <IconButton
          aria-label="delete"
          onClick={() => onDelete({ productId, itemId: item.id })}
          data-testid="product-item-delete-button"
        >
          <ClearIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default ProductItem;
