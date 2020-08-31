import Config from "../../config";
import i18n from "../../i18n";
import { TabProps } from "./AppBar/Tabs";

export const tabs: { [key: string]: TabProps[] } = {
  profile: [
    {
      key: "profilePersonal",
      label: i18n.t("personal"),
      path: "/profile/personal",
      order: 0,
    },
    {
      key: "profileCompany",
      label: i18n.t("company"),
      path: "/profile/company",
      order: 1,
    },
    {
      key: "profileDocuments",
      label: i18n.t("documents"),
      path: "/profile/documents",
      order: 2,
    },
  ],
  seller: [
    {
      key: "main",
      label: i18n.t("buy"),
      path: "/",
      order: 0,
    },
    {
      key: "sellerProducts",
      label: i18n.t("sell"),
      path: "/seller/products",
      order: 1,
    },
    ...(Config.features.routes
      ? [
          {
            key: "routes",
            label: i18n.t("logistics"),
            path: "/seller/logistic/routes",
            order: 2,
          },
        ]
      : []),
  ],
  history: [
    {
      key: "purchases",
      label: i18n.t("purchases"),
      path: "/history/orders/purchases",
      order: 0,
    },
    {
      key: "sales",
      label: i18n.t("sales"),
      path: "/history/orders/sales",
      order: 1,
    },
  ],
};
