export type CheckoutType = {
  id: number;
  earliestDeliveryDate: string | null;
  deliveryAddress: number | null;
  deliveryFeeGross: number;
  deliveryFeeNet: number;
  netTotal: number;
  platformFeeGross: number;
  platformFeeNet: number;
  productTotal: number;
  grossTotal: number;
  totalContainerDeposit: number;
  vatTotal: number;
  vatBreakdown: { [key: string]: number };
  deposit: DepositType[];
  items: CheckoutItemType[];
};

export type CheckoutItemType = {
  id: number;
  deliveryFeeGross: number;
  latestDeliveryDate: string;
  platformFeeGross: number;
  priceGross: number;
  priceNet: number;
  quantity: number;
  deliveryOption: CheckoutDeliveryOptionType;
  deliveryOptions: ProductDeliveryOptionType[];
  product: {
    id: number;
    amount: number;
    name: string;
    price: number;
    unit: string;
    vat: number;
  };
};

export type DepositType = {
  depositPerUnit: string;
  depositTotal: number;
  sizeClass: string;
  unit: string;
  vat: number;
  count: number;
};

export type CheckoutDeliveryOptionType = {
  id: number;
  name: string;
};

export type ProductDeliveryOptionType = {
  id: number;
  name: string;
  value: number;
};
