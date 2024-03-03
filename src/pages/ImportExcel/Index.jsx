import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React from "react";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";
import {
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";

const steps = ["UPLOAD FILE", "MAPPING-DATA", "PREVIEW", "RESULT"];

const StepComponents = [
  <Step1 key="step-1" />,
  <Step2 key="step-2" />,
  <Step3 key="step-3" />,
  <Step4 key="step-4" />,
];
export default function ImportExcelPage() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [completed, setCompleted] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === -1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const isStepCompleted = (step) => {
    return completed.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setCompleted((prevCompleted) => {
      const newCompleted = new Set(prevCompleted.values());
      newCompleted.add(activeStep);
      return newCompleted;
    });

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted(new Set());
  };

  const connector = (
    <StepConnector
      sx={{
        ".MuiStepConnector-line": {
          borderTopWidth: 2,
        },
      }}
    />
  );
  const methods = useForm();
  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <Box sx={{ width: "800px" }}>
        {activeStep}a
        <Stepper
          activeStep={activeStep}
          connector={connector}
          sx={{
            position: "static",
            width: "100%",
            padding: "24px",
            ".MuiStepConnector-root": {
              transition: "border-color 0.3s ease",
              "&.Mui-completed, &.Mui-active ": {
                "& .MuiStepConnector-line": {
                  borderColor: "#02aaec",
                },
              },
            },
          }}
        >
          {steps.map((label, index) => {
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }

            return (
              <Step
                key={label}
                completed={!!isStepCompleted(index)}
                sx={{
                  ".MuiStepLabel-root.MuiStepLabel-horizontal": {
                    cursor: "pointer",
                    "&:hover": {
                      fontWeight: 700,
                    },
                  },
                }}
              >
                <StepLabel
                  onClick={() => setActiveStep(index)}
                  // sx={{ '.MuiStepLabel-label.Mui-active': { color: 'red' } }}
                  {...labelProps}
                  sx={{
                    ".MuiStepLabel-iconContainer": {
                      paddingRight: 0,
                      borderRadius: "100%",
                      border: "2px solid #cccccc",

                      "&.Mui-completed,&.Mui-active ": {
                        borderColor: "#02aaec",
                      },
                      "&.Mui-active": {
                        fontWeight: 700,
                      },
                    },
                    ".MuiSvgIcon-root.MuiStepIcon-root": {
                      transition: "all 0.3s ease",
                      color: "#e8e8e8",
                      "&.Mui-completed": {
                        color: "#65d3ff",
                      },
                      "& .MuiStepIcon-text": {
                        transition: "all 0.3s ease",
                        fontSize: "1rem",
                        fill: "#112b3d",
                      },
                      "&.Mui-active": {
                        color: "#02aaec",
                        "& .MuiStepIcon-text": {
                          fill: "white",
                        },
                      },
                    },
                    ".MuiStepLabel-labelContainer": {
                      "& .MuiStepLabel-label": {
                        transition: "all 0.3s ease",
                        fontWeight: "inherit",
                        "&.Mui-active": {
                          fontWeight: 700,
                        },
                        "&.Mui-completed": {
                          color: "#02aaec",
                        },
                      },
                    },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              {StepComponents[activeStep]}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}

              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </FormProvider>
  );
}
