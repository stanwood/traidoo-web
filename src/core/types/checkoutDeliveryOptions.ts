export type CheckoutDeliveryOptionsItem = {
  id: number;
  product: { id: number; name: string };
  deliveryOption: { id: number; name: string };
  deliveryOptions: { id: number; value: number }[];
};

export type CheckoutDeliveryOptions = {
  deliveryFeeNet: number;
  deliveryAddress: number | null;
  earliestDeliveryDate: number | null;
  items: CheckoutDeliveryOptionsItem[];
};
