import { ProductPostRequestData } from "../../../../core/interfaces/products/productRequest";
import { ProductFormData } from "./types";

export const convertFormDataToProduct = (
  formData: ProductFormData
): ProductPostRequestData => {
  return {
    name: formData.name,
    categoryId: formData.category.id,
    description: formData.description,
    image: formData.image,
    isOrganic: formData.isOrganic,
    isVegan: formData.isVegan,
    isGlutenFree: formData.isGlutenFree,
    isGrazingAnimal: formData.isGrazingAnimal,
    isGmoFree: formData.isGmoFree,
    price: formData.price,
    unit: formData.unit,
    vat: formData.vat,
    amount: formData.amount,
    containerTypeId: formData.container.id,
    deliveryCharge: formData.deliveryCharge,
    deliveryOptionsIds: formData.deliveryOptions.map(
      (deliveryOption) => deliveryOption.id
    ),
    regions: formData.regions?.map((region) => region.id),
    sellersProductIdentifier: formData.sellersProductIdentifier,
    tags: formData.tags?.map((tag) => tag.id),
    ean8: formData.ean8,
    ean13: formData.ean13,
  };
};
