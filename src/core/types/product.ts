import { Container } from "../../api/queries/containers";
import { Tag } from "../../api/queries/tags";
import { Category } from "../interfaces/categories";
import DeliveryOption from "./deliveryOption";
import Region from "./region";

type Product = {
  id: number;
  name: string;
  description: string;
  image: string;
  price?: number;
  unit: string;
  amount: number;
  vat: number;
  itemsAvailable: number | null;
  isOrganic: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isGrazingAnimal: boolean;
  isGmoFree: boolean;
  seller: {
    id: number;
    companyName: string;
    city: string;
  };
  category: Category;
  containerType: Container;
  deliveryOptions: DeliveryOption[];
  thirdPartyDelivery: boolean;
  deliveryCharge: number;
  delivery: { [key: string]: number };
  region: Region;
  regions: Region[];
  ean8: string;
  ean13: string;
  sellersProductIdentifier: string;
  tags: Tag[];
};

export default Product;
