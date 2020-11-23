import React from "react";
import { useTranslation } from "react-i18next";
import CheckoutDelivery from "../../components/Checkout";
import Page from "../../components/Common/Page";
import { SkeletonList } from "../../components/Sekeleton";
import { CheckoutContext } from "./context";

const Checkout = () => {
  const { t } = useTranslation();
  const pageTitle = t("checkout");
  const { isDataLoaded } = React.useContext(CheckoutContext);

  return (
    <Page title={pageTitle}>
      {!isDataLoaded ? <SkeletonList /> : <CheckoutDelivery />}
    </Page>
  );
};

export default Checkout;
