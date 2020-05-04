import Skeleton from "@material-ui/lab/Skeleton";
import addDays from "date-fns/addDays";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import formatISO from "date-fns/formatISO";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
  cartDeliveryAddressRequest,
  cartDeliveryDateRequest,
  cartItemDeliveryOptionRequest,
} from "../../api/queries/cart";
import { getCheckoutRequest } from "../../api/queries/checkout";
import { getUserDeliveryAddressesRequest } from "../../api/queries/users/profile";
import CheckoutDelivery from "../../components/Checkout";

const Checkout = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [updateDeliveryOptionMutation] = useMutation(
    cartItemDeliveryOptionRequest
  );
  const [updateDeliveryDateMutation] = useMutation(cartDeliveryDateRequest);
  const { data: checkoutData, status: checkoutStatus } = useQuery(
    "/checkout",
    getCheckoutRequest
  );

  const { data: deliveryAddresses, status: deliveryAddressesStatus } = useQuery(
    "/delivery_addresses",
    getUserDeliveryAddressesRequest
  );

  const now = Date.now();

  const deliveryDays = eachDayOfInterval({
    start: addDays(now, 1),
    end: addDays(now, 8),
  }).map((day) => formatISO(day, { representation: "date" }));

  const updateDeliveryOption = async (
    productId: number,
    deliveryOptionId: number
  ): Promise<void> => {
    await updateDeliveryOptionMutation({
      productId,
      deliveryOption: deliveryOptionId,
    });
  };

  const updateDeliveryDate = async (
    earliestDeliveryDate: string
  ): Promise<void> => {
    await updateDeliveryDateMutation({ date: earliestDeliveryDate });
  };

  const updateDeliveryAddress = (deliveryAddress: number): void => {
    setIsButtonDisabled(true);
    // TODO: use useQuery
    cartDeliveryAddressRequest(deliveryAddress).then((data: any) => {
      setIsButtonDisabled(false);
    });
  };

  return (
    <>
      {(deliveryAddressesStatus === "loading" ||
        checkoutStatus === "loading") && (
        <>
          {Array.from(Array(10).keys()).map((number: number) => (
            <Skeleton key={number} />
          ))}
        </>
      )}

      {deliveryAddresses && checkoutData && (
        <CheckoutDelivery
          checkout={checkoutData}
          deliveryDays={deliveryDays}
          deliveryAddresses={deliveryAddresses}
          onDeliveryOptionUpdate={updateDeliveryOption}
          onDeliveryDateUpdate={updateDeliveryDate}
          onDeliveryAddressUpdate={updateDeliveryAddress}
          checkoutPath={"/checkout/summary"}
          buttonDisabled={isButtonDisabled}
        />
      )}
    </>
  );
};

export default Checkout;
