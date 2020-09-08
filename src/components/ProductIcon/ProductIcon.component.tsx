import SvgIcon from "@material-ui/core/SvgIcon";
import React from "react";
import { ReactComponent as Gluten } from "../../images/product/gluten.svg";
import { ReactComponent as Gmo } from "../../images/product/gmo.svg";
import { ReactComponent as Organic } from "../../images/product/organic.svg";
import { ReactComponent as Range } from "../../images/product/range.svg";
import { ReactComponent as Vegan } from "../../images/product/vegan.svg";

const icons: { [key: string]: any } = {
  vegan: Vegan,
  range: Range,
  gmo: Gmo,
  organic: Organic,
  gluten: Gluten,
};

export const ProductIcon = ({ iconName, className, active }: any) => {
  return (
    <SvgIcon
      color={active ? "primary" : "disabled"}
      component={icons[iconName]}
      viewBox="0 0 12 10"
      className={className}
    />
  );
};
