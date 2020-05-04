type CartStateType = {
  earliestDeliveryDate: string | null;
  items: {
    [key: string]: {
      quantity: number;
      product: {
        name: string;
        price: number;
        unit: string;
        amount: number;
      };
    };
  };
};

export default CartStateType;
