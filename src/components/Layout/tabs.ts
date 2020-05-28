import Config from "../../config";
import i18n from "../../i18n";

export const tabs: { [key: string]: { name: string; link: string }[] } = {
  profile: [
    {
      name: i18n.t("personal"),
      link: "/profile/personal",
    },
    {
      name: i18n.t("company"),
      link: "/profile/company",
    },
    {
      name: i18n.t("documents"),
      link: "/profile/documents",
    },
  ],
  seller: [
    {
      name: i18n.t("buy"),
      link: "/",
    },
    {
      name: i18n.t("sell"),
      link: "/seller/products",
    },
    ...(Config.features.routes
      ? [
          {
            name: i18n.t("logistics"),
            link: "/seller/logistic/routes",
          },
        ]
      : []),
  ],
  history: [
    {
      name: i18n.t("orders"),
      link: "/history/orders",
    },
    {
      name: i18n.t("deliveries"),
      link: "/history/deliveries",
    },
  ],
};
