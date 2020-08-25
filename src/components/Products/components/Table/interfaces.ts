import { ProductsListResponse } from "../../../../api/queries/products/interfaces";
import { Order } from "../../types";

interface ProductsListProps {
  products: ProductsListResponse | undefined;
  onPageChange: any;
  onSortChange: any;
  page: number;
  order: Order;
  orderBy: string;
  onFilterChange?: any;
  filterBy?: string;
  sellerView?: boolean;
  deleteProduct?: (productId: number) => void;
}

export default ProductsListProps;
