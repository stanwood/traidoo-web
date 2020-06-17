import Container from "@material-ui/core/Container";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import Alert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { registerRequest } from "../../api/queries/users/register";
import RegistrationCompany from "../../components/Registration/RegistrationCompany";
import RegistrationDocuments from "../../components/Registration/RegistrationDocuments";
import RegistrationPersonal from "../../components/Registration/RegistrationPersonal";
import useStyles from "./Registration.styles";

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

const Registration: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [activeStep, setActiveStep] = useState(0);
  const [personalData, setPersonalData] = useState({});
  const [companyData, setCompanyData] = useState({});
  const [documentsData, setDocumentsData] = useState({});
  const [registrationErrors, setRegistrationErrors] = useState({});
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
    const errors: any = {};

    const errorResponse = await error.response.json();

    Object.entries(errorResponse).forEach(([key, value]: [string, any]) => {
      errors[key] = value[0].message; // TODO: do not use messages from API
    });

    setRegistrationErrors(errors);

    for (const field of Object.keys(errors)) {
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
        data.append(key, value);
      }
    });

    registerRequest(data)
      .then(() => handleNext())
      .catch((error: any) => {
        handleError(error);
      });
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
    <>
      <Helmet>
        <title>{t("Registration")}</title>
      </Helmet>

      {activeStep === steps.length ? (
        <Container component="main" maxWidth="md">
          <Alert severity="info">{t("thankYouForRegistration")}</Alert>
        </Container>
      ) : (
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
      )}
    </>
  );
};

export default Registration;
