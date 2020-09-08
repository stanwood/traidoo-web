import i18n from "../../i18n";

export const frequencyMapping: { [key: number]: string } = {
  1: i18n.t("monday"),
  2: i18n.t("tuesday"),
  3: i18n.t("wednesday"),
  4: i18n.t("thursday"),
  5: i18n.t("friday"),
};

export const frequency: { id: number; name: string }[] = [
  {
    id: 1,
    name: i18n.t("monday"),
  },
  {
    id: 2,
    name: i18n.t("tuesday"),
  },
  {
    id: 3,
    name: i18n.t("wednesday"),
  },
  {
    id: 4,
    name: i18n.t("thursday"),
  },
  {
    id: 5,
    name: i18n.t("friday"),
  },
];
