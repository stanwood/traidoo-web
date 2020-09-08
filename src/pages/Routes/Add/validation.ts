import * as yup from "yup";
import i18n from "../../../i18n";

const routesValidationSchema = yup.object().shape({
  origin: yup.string().required(i18n.t("fieldRequired")),
  destination: yup.string().required(i18n.t("fieldRequired")),
  frequency: yup
    .array()
    .ensure()
    .of(yup.number())
    .required(i18n.t("fieldRequired")),
  waypoints: yup.array().of(yup.object()),
});

export default routesValidationSchema;
