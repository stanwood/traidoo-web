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
  itemsAvailable: number;
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
  category: {
    id: number;
    name: string;
  };
  containerType: {
    id: number;
    deposit: number;
    sizeClass: string;
    image: string;
  };
  deliveryOptions: DeliveryOption[];
  thirdPartyDelivery?: boolean;
  deliveryCharge: number;
  delivery: { [key: string]: number };
  region: Region;
  regions: Region[];
  ean8: string;
  ean13: string;
  sellersProductIdentifier: string;
  tags: { id: number; slug: string; name: string }[];
};

export default Product;
