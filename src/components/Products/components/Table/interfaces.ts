import { ProductsListResponse } from "../../../../api/queries/products/interfaces";
import { Order } from "../../types";

export default interface ProductsListProps {
  products: ProductsListResponse | undefined;
  onPageChange: any;
  onSortChange: any;
  page: number;
  order: Order;
  orderBy: string;
  onFilterChange?: any;
  filterBy?: string;
  addToCart?: Function;
  removeFromCart?: Function;
  sellerView?: boolean;
}
