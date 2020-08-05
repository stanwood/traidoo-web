import SvgIcon from "@material-ui/core/SvgIcon";
import React from "react";
import Ico1 from "../../images/categories/ico1.svg";
import Ico10 from "../../images/categories/ico10.svg";
import Ico11 from "../../images/categories/ico11.svg";
import Ico12 from "../../images/categories/ico12.svg";
import Ico13 from "../../images/categories/ico13.svg";
import Ico14 from "../../images/categories/ico14.svg";
import Ico15 from "../../images/categories/ico15.svg";
import Ico16 from "../../images/categories/ico16.svg";
import Ico17 from "../../images/categories/ico17.svg";
import Ico18 from "../../images/categories/ico18.svg";
import Ico19 from "../../images/categories/ico19.svg";
import Ico2 from "../../images/categories/ico2.svg";
import Ico20 from "../../images/categories/ico20.svg";
import Ico21 from "../../images/categories/ico21.svg";
import Ico22 from "../../images/categories/ico22.svg";
import Ico23 from "../../images/categories/ico23.svg";
import Ico24 from "../../images/categories/ico24.svg";
import Ico25 from "../../images/categories/ico25.svg";
import Ico26 from "../../images/categories/ico26.svg";
import Ico27 from "../../images/categories/ico27.svg";
import Ico28 from "../../images/categories/ico28.svg";
import Ico29 from "../../images/categories/ico29.svg";
import Ico3 from "../../images/categories/ico3.svg";
import Ico30 from "../../images/categories/ico30.svg";
import Ico31 from "../../images/categories/ico31.svg";
import Ico32 from "../../images/categories/ico32.svg";
import Ico33 from "../../images/categories/ico33.svg";
import Ico34 from "../../images/categories/ico34.svg";
import Ico35 from "../../images/categories/ico35.svg";
import Ico4 from "../../images/categories/ico4.svg";
import Ico5 from "../../images/categories/ico5.svg";
import Ico6 from "../../images/categories/ico6.svg";
import Ico7 from "../../images/categories/ico7.svg";
import Ico8 from "../../images/categories/ico8.svg";
import Ico9 from "../../images/categories/ico9.svg";

// TODO: who was the idea? try to move icons to the API/GCS and return URL for each category
const icons = [
  [Ico1, "0 0 50 50"],
  [Ico2, "0 0 50 50"],
  [Ico3, "0 0 32 32"],
  [Ico4, "0 0 50 50"],
  [Ico5, "0 0 50 50"],
  [Ico6, "0 0 50 50"],
  [Ico7, "0 0 50 50"],
  [Ico8, "0 0 50 50"],
  [Ico9, "0 0 50 50"],
  [Ico10, "13 -13 50 50"],
  [Ico11, "0 0 50 50"],
  [Ico12, "0 0 50 50"],
  [Ico13, "0 0 26 26"],
  [Ico14, "0 0 50 50"],
  [Ico15, "0 0 50 50"],
  [Ico16, "0 0 50 50"],
  [Ico17, "0 0 50 50"],
  [Ico18, "0 0 50 50"],
  [Ico19, "0 0 50 50"],
  [Ico20, "0 0 50 50"],
  [Ico21, "0 0 50 50"],
  [Ico22, "0 0 50 50"],
  [Ico23, "13 -13 50 50"],
  [Ico24, "0 0 32 32"],
  [Ico25, "0 0 50 50"],
  [Ico26, "0 0 50 50"],
  [Ico27, "0 0 50 50"],
  [Ico28, "0 0 50 50"],
  [Ico29, "0 0 50 50"],
  [Ico30, "0 0 50 50"],
  [Ico31, "0 0 26 26"],
  [Ico32, "0 0 50 50"],
  [Ico33, "0 0 50 50"],
  [Ico34, "0 0 50 50"],
  [Ico35, "0 0 50 50"],
];

interface CategoryIconProps {
  iconNumber: number;
  className: string;
}

export const CategoryIcon = ({ iconNumber, className }: CategoryIconProps) => {
  const icon = icons[iconNumber];

  return (
    <SvgIcon component={icon[0]} viewBox={icon[1]} className={className} />
  );
};
