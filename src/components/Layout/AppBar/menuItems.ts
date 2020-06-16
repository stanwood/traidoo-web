import { UserState } from "../../../contexts/UserContext/interfaces";
import i18n from "../../../i18n";

export interface MenuItem {
  name: string;
  path: string;
}

const userItems: MenuItem[] = [
  { name: i18n.t("profile"), path: "/profile/personal" },
  { name: i18n.t("logout"), path: "/logout" },
];

const buyerItems: MenuItem[] = [
  { name: i18n.t("history"), path: "/history/orders" },
];

const globalItems: MenuItem[] = [
  { name: i18n.t("termsOfServices"), path: "/terms-of-services" },
  { name: i18n.t("privacyPolicy"), path: "/privacy-policy" },
  { name: i18n.t("prices"), path: "/prices" },
  { name: i18n.t("imprint"), path: "/imprint" },
  { name: i18n.t("contact"), path: "/contact" },
];

const anonymousItems: MenuItem[] = [
  { name: i18n.t("login"), path: "/login" },
  { name: i18n.t("registration"), path: "/registration" },
];

export const getRightMenuItems = (user: UserState): MenuItem[][] => {
  if (!user.id) {
    return [anonymousItems, globalItems];
  }

  if (user.groups.length === 0) {
    return [userItems, globalItems];
  }

  return [buyerItems, userItems, globalItems];
};
