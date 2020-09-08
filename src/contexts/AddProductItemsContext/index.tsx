import React, { ReactElement, useState } from "react";
import { useMutation } from "react-query";
import { addProductItemsRequest } from "../../api/queries/products/items";
import { AddProductItemsContext } from "./context";
import { AddProductItemsProps, AddProductItemsState } from "./interfaces";

const initialState: AddProductItemsState = {
  productId: undefined,
  open: false,
};

const AddProductItemsProvider = (props: AddProductItemsProps): ReactElement => {
  const [dialog, setDialog] = useState<AddProductItemsState>(initialState);

  const open = (productId: number) => {
    setDialog({ productId, open: true });
  };

  const close = () => {
    setDialog({ productId: undefined, open: false });
  };

  const [addItem] = useMutation(addProductItemsRequest);

  const value = {
    open,
    close,
    dialog,
    addItem,
  };

  return (
    <AddProductItemsContext.Provider value={value}>
      {props.children}
    </AddProductItemsContext.Provider>
  );
};

export default AddProductItemsProvider;
