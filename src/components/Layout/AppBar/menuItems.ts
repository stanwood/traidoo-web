import { UserState } from "../../../contexts/UserContext/interfaces";
import i18n from "../../../i18n";

export interface TraidooMenuItem {
  name: string;
  path: string;
}

const userItems: TraidooMenuItem[] = [
  { name: i18n.t("profile"), path: "/profile/personal" },
  { name: i18n.t("logout"), path: "/logout" },
];

const buyerItems: TraidooMenuItem[] = [
  { name: i18n.t("history"), path: "/history/orders/purchases" },
];

const globalItems: TraidooMenuItem[] = [
  { name: i18n.t("termsOfServices"), path: "/terms-of-services" },
  { name: i18n.t("privacyPolicy"), path: "/privacy-policy" },
  { name: i18n.t("prices"), path: "/prices" },
  { name: i18n.t("imprint"), path: "/imprint" },
  { name: i18n.t("contact"), path: "/contact" },
];

const anonymousItems: TraidooMenuItem[] = [
  { name: i18n.t("login"), path: "/login" },
  { name: i18n.t("registration"), path: "/registration" },
];

export const getRightMenuItems = (user: UserState): TraidooMenuItem[][] => {
  if (!user.id) {
    return [anonymousItems, globalItems];
  }

  if (user.groups.length === 0) {
    return [userItems, globalItems];
  }

  return [buyerItems, userItems, globalItems];
};
