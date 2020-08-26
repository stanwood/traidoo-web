import i18n from "../../../../i18n";
import { TableHeadCell } from "../../interfaces";

const image: TableHeadCell = {
  id: "image",
  align: "left",
  disablePadding: false,
  label: i18n.t("image"),
  sortable: false,
  hiddenForAnonymous: false,
  hideOnMobile: false,
};

const name: TableHeadCell = {
  id: "name",
  align: "left",
  disablePadding: false,
  label: i18n.t("name"),
  sortable: true,
  hiddenForAnonymous: false,
  hideOnMobile: false,
};

const seller: TableHeadCell = {
  id: "seller",
  align: "right",
  disablePadding: false,
  label: i18n.t("seller"),
  sortable: true,
  hiddenForAnonymous: false,
  hideOnMobile: true,
};

const itemsAvailable: TableHeadCell = {
  id: "itemsAvailable",
  align: "right",
  disablePadding: false,
  label: i18n.t("availableItems"),
  sortable: true,
  hiddenForAnonymous: true,
  hideOnMobile: false,
};

const price: TableHeadCell = {
  id: "price",
  align: "right",
  disablePadding: false,
  label: i18n.t("price"),
  sortable: true,
  hiddenForAnonymous: true,
  hideOnMobile: true,
};

const category: TableHeadCell = {
  id: "category",
  align: "right",
  disablePadding: false,
  label: i18n.t("category"),
  sortable: true,
  hiddenForAnonymous: false,
  hideOnMobile: true,
};

const region: TableHeadCell = {
  id: "region",
  align: "right",
  disablePadding: false,
  label: i18n.t("region"),
  sortable: false,
  hiddenForAnonymous: false,
  hideOnMobile: true,
};

const addToCart: TableHeadCell = {
  id: "addToCart",
  align: "right",
  disablePadding: false,
  label: "",
  sortable: false,
  hiddenForAnonymous: true,
  hideOnMobile: false,
};

export const anoynmousHeadCells: TableHeadCell[] = [
  image,
  name,
  seller,
  category,
  region,
];

export const sellerHeadCells: TableHeadCell[] = [
  image,
  name,
  category,
  region,
  itemsAvailable,
  price,
];

export const headCells: TableHeadCell[] = [
  image,
  name,
  seller,
  category,
  region,
  price,
  addToCart,
];
