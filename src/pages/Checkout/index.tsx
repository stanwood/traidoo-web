import Skeleton from "@material-ui/lab/Skeleton";
import addDays from "date-fns/addDays";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import formatISO from "date-fns/formatISO";
import React, { useCallback } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { cartDeliveryAddressRequest, cartDeliveryDateRequest, cartItemDeliveryOptionRequest } from "../../api/queries/cart";
import { getCheckoutRequest } from "../../api/queries/checkout";
import { getUserDeliveryAddressesRequest } from "../../api/queries/users/profile";
import CheckoutDelivery from "../../components/Checkout";

const now = Date.now();

const deliveryDays = eachDayOfInterval({
  start: addDays(now, 1),
  end: addDays(now, 8),
}).map((day) => formatISO(day, { representation: "date" }));

const Checkout: React.FC = () => {
  const { t } = useTranslation();
  const [updateDeliveryOptionMutation] = useMutation(
    cartItemDeliveryOptionRequest
  );
  const [updateDeliveryDateMutation] = useMutation(cartDeliveryDateRequest);

  const { data: checkoutData, refetch } = useQuery(
    "/checkout",
    getCheckoutRequest
  );

  const { data: deliveryAddresses } = useQuery(
    "/delivery_addresses",
    getUserDeliveryAddressesRequest
  );

  const updateDeliveryOption = useCallback(
    async (productId: number, deliveryOptionId: number): Promise<void> => {
      await updateDeliveryOptionMutation({
        productId,
        deliveryOption: deliveryOptionId,
      }).then(() => {
        refetch();
      });
    },
    []
  );

  const updateDeliveryDate = useCallback(
    async (earliestDeliveryDate: string): Promise<void> => {
      await updateDeliveryDateMutation({ date: earliestDeliveryDate });
    },
    []
  );

  const updateDeliveryAddress = useCallback((deliveryAddress: number): void => {
    // TODO: use useQuery
    cartDeliveryAddressRequest(deliveryAddress).then(() => {
      refetch();
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>{t("checkout")}</title>
      </Helmet>

      {deliveryAddresses === undefined || checkoutData === undefined ? (
        Array.from(Array(10).keys()).map((number) => <Skeleton key={number} />)
      ) : (
        <CheckoutDelivery
          checkout={checkoutData}
          deliveryDays={deliveryDays}
          deliveryAddresses={deliveryAddresses}
          onDeliveryOptionUpdate={updateDeliveryOption}
          onDeliveryDateUpdate={updateDeliveryDate}
          onDeliveryAddressUpdate={updateDeliveryAddress}
          checkoutPath={"/checkout/summary"}
        />
      )}
    </>
  );
};

export default Checkout;
