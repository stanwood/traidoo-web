import Container from "@material-ui/core/Container";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import {
  APIValidationErrors,
  parseAPI400ResponseError,
} from "../../../api/errors/parser";
import { registerRequest } from "../../../api/queries/users/register";
import Page from "../../../components/Common/Page";
import RegistrationCompany from "../../../components/Registration/RegistrationCompany";
import RegistrationDocuments from "../../../components/Registration/RegistrationDocuments";
import RegistrationPersonal from "../../../components/Registration/RegistrationPersonal";
import useStyles from "./styles";

const personalFormFields = [
  "firstName",
  "lastName",
  "email",
  "password",
  "phone",
  "birthday",
  "nationalityCountryCode",
  "residenceCountryCode",
];

const companyFormFields = [
  "companyName",
  "companyType",
  "iban",
  "companyRegistrationId",
  "vatID",
  "taxID",
  "city",
  "zip",
  "street",
  "declaredAsSeller",
  "isCertifiedOrganicProducer",
  "organicCertificationId",
];

const documentsFormFields = [
  "image",
  "companyLogoFile",
  "registrationFile",
  "termAndConditions",
];

const RegistrationFormPage: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const pageTitle = t("Registration");
  const history = useHistory();

  const [activeStep, setActiveStep] = useState(0);
  const [personalData, setPersonalData] = useState({});
  const [companyData, setCompanyData] = useState({});
  const [documentsData, setDocumentsData] = useState({});
  const [registrationErrors, setRegistrationErrors] = useState<
    APIValidationErrors[]
  >([]);
  const steps = [t("personal"), t("company"), t("documents")];

  const handleNext = (): void =>
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handleBack = (): void =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  function handlePersonalSubmit(evt: any) {
    setPersonalData(evt);
    handleNext();
  }

  function handleCompanySubmit(evt: any) {
    setCompanyData(evt);
    handleNext();
  }

  async function handleError(error: any) {
    const errorResponse = await error.response;
    const errors = parseAPI400ResponseError(errorResponse);

    setRegistrationErrors(errors);

    for (const field of errors.map((error) => error.fieldName)) {
      if (personalFormFields.includes(field)) {
        setActiveStep(0);
        break;
      } else if (companyFormFields.includes(field)) {
        setActiveStep(1);
        break;
      } else if (documentsFormFields.includes(field)) {
        setActiveStep(2);
        break;
      }
    }
  }

  function handleDocumentsSubmit(evt: any) {
    setDocumentsData(evt);

    const data = new FormData();

    const combinedData = {
      ...personalData,
      ...companyData,
      ...evt,
    };

    Object.entries(combinedData).forEach(([key, value]: [string, any]) => {
      if (value) {
        const val = value instanceof FileList ? value[0] : value;
        if (
          !(value instanceof FileList) ||
          (value instanceof FileList && val !== undefined)
        ) {
          data.append(key, val);
        }
      }
    });

    registerRequest(data)
      .then(() => history.push("/registration/success"))
      .catch((error: any) => handleError(error));
  }

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <RegistrationPersonal
            submit={handlePersonalSubmit}
            apiErrors={registrationErrors}
            data={personalData}
          />
        );
      case 1:
        return (
          <RegistrationCompany
            submit={handleCompanySubmit}
            cancel={handleBack}
            apiErrors={registrationErrors}
            data={companyData}
          />
        );
      case 2:
        return (
          <RegistrationDocuments
            submit={handleDocumentsSubmit}
            cancel={handleBack}
            apiErrors={registrationErrors}
            data={documentsData}
            // @ts-ignore
            declaredAsSeller={companyData?.declaredAsSeller}
            // @ts-ignore
            companyType={companyData?.companyType}
          />
        );
      default:
        return (
          <RegistrationPersonal
            submit={handlePersonalSubmit}
            apiErrors={registrationErrors}
            data={personalData}
          />
        );
    }
  }

  return (
    <Page title={pageTitle}>
      <Container component="main" maxWidth="md">
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map((label) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: { optional?: React.ReactNode } = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {getStepContent(activeStep)}
      </Container>
    </Page>
  );
};

export default RegistrationFormPage;
