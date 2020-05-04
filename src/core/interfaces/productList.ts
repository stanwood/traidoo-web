export default interface ProductList {
  id: number;
  name: string;
  image: string;
  price?: number;
  unit?: string;
  amount: number;
  itemsAvailable: number;
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
}
