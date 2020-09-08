import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import AddBoxIcon from "@material-ui/icons/AddBox";
import React, { useContext } from "react";
import { AddProductItemsContext } from "../../contexts/AddProductItemsContext/context";

interface AvilableItemsProps {
  itemsNumber: number;
  productId: number;
}

const AvilableItems: React.FC<AvilableItemsProps> = (
  props: AvilableItemsProps
) => {
  const { itemsNumber, productId } = props;
  const { open } = useContext(AddProductItemsContext);

  return (
    <Box>
      {itemsNumber}{" "}
      <IconButton aria-label="add an item" onClick={() => open(productId)}>
        <AddBoxIcon />
      </IconButton>
    </Box>
  );
};

export default AvilableItems;
