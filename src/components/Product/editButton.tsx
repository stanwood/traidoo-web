import Button from "@material-ui/core/Button";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const EditButton = ({
  productId,
  className,
}: {
  productId: number;
  className: any;
}) => {
  const { t } = useTranslation();
  const generateUrl = (productId: number): string =>
    `/seller/products/${productId}/edit`;

  return (
    <Button
      component={Link}
      variant="contained"
      color="primary"
      to={generateUrl(productId)}
      className={className}
      data-testid="edit-button"
    >
      {t("edit")}
    </Button>
  );
};

export default EditButton;
