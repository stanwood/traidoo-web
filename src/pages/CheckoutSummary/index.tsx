import Skeleton from "@material-ui/lab/Skeleton";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import {
  checkoutRequest,
  getCheckoutRequest,
} from "../../api/queries/checkout";
import CheckoutSummary from "../../components/CheckoutSummary";
import { Context } from "../../core/context";

const CheckoutSummaryPage = () => {
  const history = useHistory();
  const context = useContext(Context);
  const { t } = useTranslation();

  const { data: checkoutData, status: checkoutStatus } = useQuery(
    "/checkout",
    getCheckoutRequest
  );

  const [checkoutMutation] = useMutation(checkoutRequest);

  const buttonDisabled = () =>
    checkoutStatus === "loading" || checkoutData?.items.length === 0;

  const roundPrice = (price: number | undefined): number =>
    price ? Math.round((price + Number.EPSILON) * 100) / 100 : 0;

  const summaryLeft = [
    { name: t("products"), value: roundPrice(checkoutData?.productTotal) },
    {
      name: t("deposit"),
      value: roundPrice(checkoutData?.totalContainerDeposit),
    },
    {
      name: t("platformFee"),
      value: roundPrice(checkoutData?.platformFeeNet),
    },
    {
      name: t("deliveryFees"),
      value: roundPrice(checkoutData?.deliveryFeeNet),
    },
    { name: t("totalNet"), value: roundPrice(checkoutData?.netTotal) },
  ];

  const vatBreakDown = checkoutData?.vatBreakdown || {};
  const formattedVatBreakDown = Object.entries(vatBreakDown)
    .filter(([key, value]: any) => value > 0)
    .map(([key, value]) => {
      return {
        name: `vat ${Math.trunc(Number(key))}%`,
        // @ts-ignore
        value: roundPrice(value),
      };
    });

  const summaryRight = [
    { name: t("totalNet"), value: roundPrice(checkoutData?.netTotal) },
    ...(formattedVatBreakDown || {}),
    { name: t("totalVat"), value: roundPrice(checkoutData?.vatTotal) },
    {
      name: t("totalGross"),
      value: roundPrice(checkoutData?.productTotal),
    },
  ];

  const onSubmit = async () => {
    await checkoutMutation();
    context.dispatch({
      type: "addMessage",
      payload: { message: t("orderCreated") },
    });
    context.dispatch({
      type: "cart",
      payload: { earliestDeliveryDate: null, items: {} }, // TODO: add deleteCart action
    });
    history.push("/");
  };

  if (checkoutStatus === "loading") {
    return (
      <>
        {Array.from(Array(10).keys()).map((number: number) => (
          <Skeleton key={number} />
        ))}
      </>
    );
  }

  return (
    <CheckoutSummary
      checkout={checkoutData}
      summaryLeft={summaryLeft}
      summaryRight={summaryRight}
      isProceedDisabled={buttonDisabled}
      onSubmit={onSubmit}
    />
  );
};

export default CheckoutSummaryPage;
