export interface ProductPostRequestData {
  name: string;
  categoryId: number;
  description: string;
  image?: File[];
  isOrganic: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isGrazingAnimal: boolean;
  isGmoFree: boolean;
  price: number;
  unit: string;
  vat: number;
  amount: number;
  containerTypeId: number;
  deliveryCharge?: number;
  deliveryOptionsIds: number[];
  regions?: number[];
  sellersProductIdentifier?: string;
  tags?: number[];
  ean8?: string;
  ean13?: string;
}
