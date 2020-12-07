import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import {
  checkoutRequest,
  getCheckoutRequest,
} from "../../api/queries/checkout";
import CheckoutSummary from "../../components/CheckoutSummary";
import Page from "../../components/Common/Page";
import { SkeletonList } from "../../components/Sekeleton";
import { CartContext } from "../../contexts/CartContext/context";

const CheckoutSummaryPage: React.FC = () => {
  const history = useHistory();
  const { initialState } = useContext(CartContext);
  const { t } = useTranslation();
  const pageTitle = t("checkoutSummary");

  const { data: checkoutData, status: checkoutStatus } = useQuery(
    "/checkout",
    getCheckoutRequest
  );

  const [checkoutMutation, { status: checkoutMutationStatus }] = useMutation(
    checkoutRequest
  );

  const buttonDisabled = React.useMemo(() => {
    return (
      checkoutStatus === "loading" ||
      checkoutData?.items.length === 0 ||
      checkoutMutationStatus === "loading"
    );
  }, [checkoutStatus, checkoutData, checkoutMutationStatus]);

  const roundPrice = (price: number | undefined): number =>
    price ? Math.round((price + Number.EPSILON) * 100) / 100 : 0;

  const vatBreakDown = checkoutData?.vatBreakdown || {};
  const formattedVatBreakDown = Object.entries(vatBreakDown).map(
    ([key, value]) => {
      return {
        name: `${t("vat")} ${Number(key).toFixed(2)}%`,
        value: value,
      };
    }
  );

  const summary = [
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
    ...(formattedVatBreakDown || {}),
    { name: t("totalVat"), value: roundPrice(checkoutData?.vatTotal) },
    {
      name: t("totalGross"),
      value: roundPrice(checkoutData?.grossTotal),
    },
  ];

  const onSubmit = async () => {
    await checkoutMutation();
    initialState();
    history.push("/checkout/success");
  };

  return (
    <Page title={pageTitle}>
      {checkoutStatus === "loading" ? (
        <SkeletonList />
      ) : (
        <CheckoutSummary
          checkout={checkoutData}
          summary={summary}
          isProceedDisabled={buttonDisabled}
          onSubmit={onSubmit}
        />
      )}
    </Page>
  );
};

export default CheckoutSummaryPage;
