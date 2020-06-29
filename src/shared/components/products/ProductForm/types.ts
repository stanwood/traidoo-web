import { Container } from "../../../../api/queries/containers";
import { Region } from "../../../../api/queries/regions";
import { Tag } from "../../../../api/queries/tags";
import { Category } from "../../../../core/interfaces/categories";
import DeliveryOption from "../../../../core/types/deliveryOption";

export type ProductFormData = {
  // General
  name: string;
  category: Category;
  description: string;
  // Image
  image: File[];
  // Properties
  isOrganic: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isGrazingAnimal: boolean;
  isGmoFree: boolean;
  // Pricing
  price: number;
  unit: string;
  vat: number;
  amount: number;
  // Delivery
  container: Container;
  deliveryCharge?: number;
  deliveryOptions: DeliveryOption[];
  thirdPartyDelivery: boolean;
  // Availability
  regions?: Region[];
  // Internal
  sellersProductIdentifier?: string;
  tags?: Tag[];
  ean8?: string;
  ean13?: string;
};
