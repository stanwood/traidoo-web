import SvgIcon from "@material-ui/core/SvgIcon";
import React from "react";
import Gluten from "../../images/product/gluten.svg";
import Gmo from "../../images/product/gmo.svg";
import Organic from "../../images/product/organic.svg";
import Range from "../../images/product/range.svg";
import Vegan from "../../images/product/vegan.svg";

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
