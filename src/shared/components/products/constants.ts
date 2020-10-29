import DeliveryOption from "../../../core/types/deliveryOption";
import i18n from "../../../i18n";

export const productUnits: Record<string, string> = {
  kg: i18n.t("kg"),
  g: i18n.t("g"),
  l: i18n.t("l"),
  ml: i18n.t("ml"),
  // INFO: Uppercase letters are intended to correctly translate production data.
  Piece: i18n.t("Piece"),
  Glass: i18n.t("Glass"),
  Net: i18n.t("Net"),
  Bundle: i18n.t("Bundle"),
  Bottle: i18n.t("Bottle"),
};

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
