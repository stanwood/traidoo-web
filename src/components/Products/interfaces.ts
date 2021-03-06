import { Order } from "./types";

export interface TableColumnsWithSorting {
  createdAt: string;
  name: string;
  seller: string;
  category: number;
  region: string;
  price: number;
  itemsAvailable: number;
}

export interface TableColumns extends TableColumnsWithSorting {
  image: string;
  addToCart: boolean;
  deleteProduct: boolean;
}

export interface TableHeadCell {
  disablePadding: boolean;
  id: keyof TableColumns;
  label: string;
  align: "right" | "left";
  sortable: boolean;
  hiddenForAnonymous: boolean;
  hideOnMobile: boolean;
}

export interface TableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof TableColumns
  ) => void;
  order: Order;
  orderBy: string;
  sellerView?: boolean;
}
