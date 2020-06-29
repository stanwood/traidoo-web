import DeliveryOption from "../../../core/types/deliveryOption";
import i18n from "../../../i18n";

export const productUnits: Record<string, string> = {
  kg: i18n.t("kg"),
  g: i18n.t("g"),
  l: i18n.t("l"),
  ml: i18n.t("ml"),
  piece: i18n.t("piece"),
  glass: i18n.t("glass"),
  net: i18n.t("net"),
  bundle: i18n.t("bundle"),
  bottle: i18n.t("bottle"),
};

export const productVat = [0, 7, 10.7, 19];

export const deliveryOptions: DeliveryOption[] = [
  { id: 0, name: "centralLogistic", label: i18n.t("byCentralLogistic") },
  { id: 1, name: "seller", label: i18n.t("bySeller") },
  { id: 2, name: "buyer", label: i18n.t("byBuyer") },
];

export const productProperties = [
  { name: "isOrganic", label: i18n.t("organic") },
  { name: "isGrazingAnimal", label: i18n.t("grasing") },
  { name: "isVegan", label: i18n.t("vegan") },
  { name: "isGlutenFree", label: i18n.t("glutenFree") },
  { name: "isGmoFree", label: i18n.t("gmoFree") },
];
