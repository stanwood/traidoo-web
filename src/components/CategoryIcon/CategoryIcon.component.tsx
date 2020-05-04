import SvgIcon from "@material-ui/core/SvgIcon";
import React from "react";
import { ReactComponent as Ico1 } from "../../images/categories/ico1.svg";
import { ReactComponent as Ico10 } from "../../images/categories/ico10.svg";
import { ReactComponent as Ico11 } from "../../images/categories/ico11.svg";
import { ReactComponent as Ico12 } from "../../images/categories/ico12.svg";
import { ReactComponent as Ico13 } from "../../images/categories/ico13.svg";
import { ReactComponent as Ico14 } from "../../images/categories/ico14.svg";
import { ReactComponent as Ico15 } from "../../images/categories/ico15.svg";
import { ReactComponent as Ico16 } from "../../images/categories/ico16.svg";
import { ReactComponent as Ico17 } from "../../images/categories/ico17.svg";
import { ReactComponent as Ico18 } from "../../images/categories/ico18.svg";
import { ReactComponent as Ico19 } from "../../images/categories/ico19.svg";
import { ReactComponent as Ico2 } from "../../images/categories/ico2.svg";
import { ReactComponent as Ico20 } from "../../images/categories/ico20.svg";
import { ReactComponent as Ico21 } from "../../images/categories/ico21.svg";
import { ReactComponent as Ico22 } from "../../images/categories/ico22.svg";
import { ReactComponent as Ico23 } from "../../images/categories/ico23.svg";
import { ReactComponent as Ico24 } from "../../images/categories/ico24.svg";
import { ReactComponent as Ico25 } from "../../images/categories/ico25.svg";
import { ReactComponent as Ico26 } from "../../images/categories/ico26.svg";
import { ReactComponent as Ico27 } from "../../images/categories/ico27.svg";
import { ReactComponent as Ico28 } from "../../images/categories/ico28.svg";
import { ReactComponent as Ico29 } from "../../images/categories/ico29.svg";
import { ReactComponent as Ico3 } from "../../images/categories/ico3.svg";
import { ReactComponent as Ico30 } from "../../images/categories/ico30.svg";
import { ReactComponent as Ico31 } from "../../images/categories/ico31.svg";
import { ReactComponent as Ico32 } from "../../images/categories/ico32.svg";
import { ReactComponent as Ico33 } from "../../images/categories/ico33.svg";
import { ReactComponent as Ico34 } from "../../images/categories/ico34.svg";
import { ReactComponent as Ico35 } from "../../images/categories/ico35.svg";
import { ReactComponent as Ico4 } from "../../images/categories/ico4.svg";
import { ReactComponent as Ico5 } from "../../images/categories/ico5.svg";
import { ReactComponent as Ico6 } from "../../images/categories/ico6.svg";
import { ReactComponent as Ico7 } from "../../images/categories/ico7.svg";
import { ReactComponent as Ico8 } from "../../images/categories/ico8.svg";
import { ReactComponent as Ico9 } from "../../images/categories/ico9.svg";

// TODO: who was the idea? try to move icons to the API and return URL for each category
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
  Ico35
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
