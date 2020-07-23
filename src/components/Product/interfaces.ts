import Product from "../../core/types/product";

export interface ProductDetailsProps {
  product: Product;
  error: Error | null;
  showEditButton?: boolean;
}
