import { Order } from "../../../components/Products/types";
import ProductList from "../../../core/interfaces/productList";
import Product from "../../../core/types/product";

export interface ProductsListQueryParams {
  limit: number;
  offset: number;
  isAvailable: boolean;
  category?: number;
  search?: string;
  page?: number;
  organic?: boolean;
  order?: Order;
  orderBy: string;
  seller?: number;
}

export interface ProductsListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProductList[];
}

export interface ProductResponse extends Product {}
