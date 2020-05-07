import { ProductFormData } from "../../../shared/products/ProductForm/types";

const replacements: { [key: string]: string } = {
  isOrganic: "is_organic",
  isVegan: "is_vegan",
  isGlutenFree: "is_gluten_free",
  isGrazingAnimal: "is_grazing_animal",
  isGmoFree: "is_gmo_free",
  containerTypeId: "container_type_id",
  deliveryCharge: "delivery_charge",
  deliveryOptionsIds: "delivery_options_ids",
  sellersProductIdentifier: "sellers_product_identifier",
  categoryId: "category_id",
};

// FIXME: https://github.com/vbabiy/djangorestframework-camel-case/issues/82

const fixData = (data: ProductFormData) => {
  return Object.keys(data).reduce((acc, key) => {
    // @ts-ignore
    acc[replacements[key] || key] = data[key];
    return acc;
  }, {});
};

export default fixData;
