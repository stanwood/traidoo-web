import i18n from "../../../i18n";

export const deliveryOptionsMapping: { [key: number]: string } = {
  0: i18n.t("logisticDelivery"),
  1: i18n.t("sellerDelivery"),
  2: i18n.t("selfCollect"),
};
