interface ProductList {
  id: number;
  name: string;
  image: string;
  price?: number;
  unit?: string;
  amount: number;
  itemsAvailable: number | null;
  seller: {
    id: number;
    firstName: string;
    lastName: string;
    city: string;
  };
  category: {
    id: number;
    name: string;
  };
  region: {
    id: number;
    slug: string;
    name: string;
  };
}

export default ProductList;
