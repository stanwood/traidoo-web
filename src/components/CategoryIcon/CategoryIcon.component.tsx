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
  Ico1,
  Ico2,
  Ico3,
  Ico4,
  Ico5,
  Ico6,
  Ico7,
  Ico8,
  Ico9,
  Ico10,
  Ico11,
  Ico12,
  Ico13,
  Ico14,
  Ico15,
  Ico16,
  Ico17,
  Ico18,
  Ico19,
  Ico20,
  Ico21,
  Ico22,
  Ico23,
  Ico24,
  Ico25,
  Ico26,
  Ico27,
  Ico28,
  Ico29,
  Ico30,
  Ico31,
  Ico32,
  Ico33,
  Ico34,
  Ico35,
];

export const CategoryIcon = ({ iconNumber, className }: any) => {
  return (
    <SvgIcon
      component={icons[iconNumber]}
      viewBox="0 0 50 50"
      className={className}
    />
  );
};
