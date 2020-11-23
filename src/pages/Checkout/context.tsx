import React from "react";
import { MutateFunction, useMutation, useQuery } from "react-query";
import {
  cartDeliveryAddressRequest,
  cartDeliveryDateRequest,
  cartDeliveryOptionBulkEditRequest,
  cartItemDeliveryOptionRequest,
} from "../../api/queries/cart";
import { getCheckoutDeliveryOptionsRequest } from "../../api/queries/checkout";
import { getUserDeliveryAddressesRequest } from "../../api/queries/users/profile";
import DeliveryAddress from "../../core/interfaces/deliveryAddress";
import { CheckoutDeliveryOptions } from "../../core/types/checkoutDeliveryOptions";

interface CheckoutStateContext {
  isDataLoaded: boolean;
  isCheckoutEnabled: boolean;
  checkoutDelivery: CheckoutDeliveryOptions | undefined;
  deliveryAddresses: DeliveryAddress[] | undefined;
  updateDeliveryDate: MutateFunction<
    any,
    unknown,
    {
      date: string;
    },
    unknown
  >;
  updateDeliveryOption: MutateFunction<
    any,
    unknown,
    {
      productId: number;
      deliveryOption: number;
    },
    unknown
  >;
  updateDeliveryOptionBulk: MutateFunction<
    any,
    unknown,
    {
      deliveryOption: number;
    },
    unknown
  >;
  updateDeliveryAddress: MutateFunction<any, unknown, number, unknown>;
  deliveryOption: number;
  setDeliveryOption: React.Dispatch<React.SetStateAction<number>>;
}

interface CheckoutProviderProps {
  children: React.ReactChild;
}

export const CheckoutContext = React.createContext<CheckoutStateContext>(
  {} as CheckoutStateContext
);

export const CheckoutProvider = (
  props: CheckoutProviderProps
): React.ReactElement => {
  const [deliveryOption, setDeliveryOption] = React.useState<number>(0);

  const {
    data: checkoutDelivery,
    refetch: refetchCheckoutDelivery,
    isFetching: isCheckoutDeliveryFetching,
  } = useQuery("/checkout/delivery", getCheckoutDeliveryOptionsRequest);

  const { data: deliveryAddresses } = useQuery(
    "/delivery_addresses",
    getUserDeliveryAddressesRequest
  );

  const [
    updateDeliveryDate,
    { isLoading: isUpdateDeliveryDateLoading },
  ] = useMutation(cartDeliveryDateRequest);

  const [
    updateDeliveryOption,
    { isLoading: isUpdateDeliveryOptionLoading },
  ] = useMutation(cartItemDeliveryOptionRequest, {
    onSuccess: () => {
      refetchCheckoutDelivery();
    },
  });

  const [
    updateDeliveryOptionBulk,
    { isLoading: isUpdateDeliveryOptionBulkLoading },
  ] = useMutation(cartDeliveryOptionBulkEditRequest, {
    onSuccess: () => {
      refetchCheckoutDelivery();
    },
  });

  const [updateDeliveryAddress] = useMutation(cartDeliveryAddressRequest, {
    onSuccess: () => {
      refetchCheckoutDelivery();
    },
  });

  const isDataLoaded = React.useMemo((): boolean => {
    return checkoutDelivery !== undefined && deliveryAddresses !== undefined;
  }, [checkoutDelivery, deliveryAddresses]);

  const isCheckoutEnabled = React.useMemo((): boolean => {
    return (
      !isUpdateDeliveryDateLoading &&
      !isUpdateDeliveryOptionLoading &&
      !isUpdateDeliveryOptionBulkLoading &&
      !isCheckoutDeliveryFetching
    );
  }, [
    isUpdateDeliveryDateLoading,
    isUpdateDeliveryOptionLoading,
    isUpdateDeliveryOptionBulkLoading,
    isCheckoutDeliveryFetching,
  ]);

  const value = {
    isDataLoaded,
    isCheckoutEnabled,
    checkoutDelivery,
    deliveryAddresses,
    updateDeliveryDate,
    updateDeliveryOption,
    updateDeliveryOptionBulk,
    updateDeliveryAddress,
    deliveryOption,
    setDeliveryOption,
  };

  return (
    <CheckoutContext.Provider value={value}>
      {props.children}
    </CheckoutContext.Provider>
  );
};
