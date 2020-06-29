import { ProductPostRequestData } from "../../../core/interfaces/products/productRequest";

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
  thirdPartyDelivery: "third_party_delivery",
};

// FIXME: https://github.com/vbabiy/djangorestframework-camel-case/issues/82

const fixData = (data: ProductPostRequestData) => {
  return Object.keys(data).reduce((acc, key) => {
    // @ts-ignore
    acc[replacements[key] || key] = data[key];
    return acc;
  }, {});
};

export default fixData;
