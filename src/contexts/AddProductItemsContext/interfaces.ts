import { ReactChild } from "react";
import { MutateFunction } from "react-query";

export interface AddProductItemsState {
  productId: number | undefined;
  itemId: number | undefined;
  itemsNumber: number | undefined;
  date: string | undefined;
  open: boolean;
}

export interface AddProductItemsStateContext {
  open: (
    productId: number,
    itemId?: number,
    itemsNumber?: number,
    date?: string
  ) => void;
  close: () => void;
  dialog: AddProductItemsState;
  addItem: MutateFunction<
    any,
    unknown,
    {
      productId: number;
      quantity: number;
      latestDeliveryDate: string;
    },
    unknown
  >;
  editItem: MutateFunction<
    any,
    unknown,
    {
      productId: number;
      itemId: number;
      quantity: number;
      latestDeliveryDate: string;
    },
    unknown
  >;
}

export interface AddProductItemsProps {
  children: ReactChild | ReactChild[];
}

export interface ProductItemFormData {
  quantity: number;
  latestDeliveryDate: Date | string;
}
