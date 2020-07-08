import i18n from "../../i18n";

const documentTypes: Record<string, string> = {
  "Buyer Platform Invoice": i18n.t("platformInvoice"),
  "Platform Invoice": i18n.t("platformInvoice"),
  "Logistics Invoice": i18n.t("logisticInvoice"),
  "Producer Invoice": i18n.t("producerInvoice"),
  "Order Confirmation Buyer": i18n.t("orderConfirmation"),
  "Delivery Overview Buyer": i18n.t("deliveryOverview"),
  "Delivery Overview Seller": i18n.t("deliveryOverview"),
  "Receipt Buyer": i18n.t("receipt"),
  "Credit Note": i18n.t("creditNote"),
};

const translateDocumentType = (documentType: string): string => {
  return documentTypes[documentType];
};

export default translateDocumentType;
