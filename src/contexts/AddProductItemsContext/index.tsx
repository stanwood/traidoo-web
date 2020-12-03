import React, { ReactElement, useState } from "react";
import { useMutation } from "react-query";
import {
  addProductItemsRequest,
  editProductItemsRequest,
} from "../../api/queries/products/items";
import { AddProductItemsContext } from "./context";
import { AddProductItemsProps, AddProductItemsState } from "./interfaces";

const initialState: AddProductItemsState = {
  productId: undefined,
  itemId: undefined,
  itemsNumber: undefined,
  date: undefined,
  open: false,
};

const AddProductItemsProvider = (props: AddProductItemsProps): ReactElement => {
  const [dialog, setDialog] = useState<AddProductItemsState>(initialState);

  const open = (
    productId: number,
    itemId?: number,
    itemsNumber?: number,
    date?: string
  ) => {
    setDialog({ productId, itemId, itemsNumber, date, open: true });
  };

  const close = () => {
    setDialog({
      productId: undefined,
      itemId: undefined,
      itemsNumber: undefined,
      date: undefined,
      open: false,
    });
  };

  const [addItem] = useMutation(addProductItemsRequest);
  const [editItem] = useMutation(editProductItemsRequest);

  const value = {
    open,
    close,
    dialog,
    addItem,
    editItem,
  };

  return (
    <AddProductItemsContext.Provider value={value}>
      {props.children}
    </AddProductItemsContext.Provider>
  );
};

export default AddProductItemsProvider;
