import i18n from "../../../i18n";

const buyerItems = [{ name: i18n.t("history"), path: "/history/orders" }];

const userItems = [
  { name: i18n.t("profile"), path: "/profile/personal" },
  { name: i18n.t("logout"), path: "/logout" },
];

const globalItems = [
  { name: i18n.t("termsOfServices"), path: "/terms-of-services" },
  { name: i18n.t("privacyPolicy"), path: "/privacy-policy" },
  { name: i18n.t("prices"), path: "/prices" },
  { name: i18n.t("imprint"), path: "/imprint" },
  { name: i18n.t("contact"), path: "/contact" },
];

const anonymousItems = [
  { name: i18n.t("login"), path: "/login" },
  { name: i18n.t("registration"), path: "/registration" },
];

export const rightMenuAnonymousItems = [anonymousItems, globalItems];

export const rightMenuSellerItems = [buyerItems, userItems, globalItems];

export const rightMenuBuyerItems = [buyerItems, userItems, globalItems];
