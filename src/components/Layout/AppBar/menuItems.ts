import i18n from "../../../i18n";

const sellerItems = [
  { name: i18n.t("sell"), path: "/sell" },
  { name: i18n.t("logistics"), path: "/logistics" },
];

const buyerItems = [{ name: i18n.t("history"), path: "/history" }];

const userItems = [
  { name: i18n.t("profile"), path: "/profile/personal" },
  { name: i18n.t("logout"), path: "/logout" },
];

const globalItems = [
  { name: i18n.t("termsAndConditions"), path: "/terms" },
  { name: i18n.t("privacyPolicy"), path: "/privacy" },
  { name: i18n.t("contact"), path: "/contact" },
];

const anonymousItems = [
  { name: i18n.t("login"), path: "/login" },
  { name: i18n.t("registration"), path: "/registration" },
];

export const rightMenuAnonymousItems = [anonymousItems, globalItems];

export const rightMenuSellerItems = [
  sellerItems,
  buyerItems,
  userItems,
  globalItems,
];

export const rightMenuBuyerItems = [buyerItems, userItems, globalItems];
