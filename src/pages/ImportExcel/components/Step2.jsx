import {
  Autocomplete,
  Box,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

const InputFieldOptions = ({ allField, multiple, name, onChange }) => {
  const { control, getValues } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Autocomplete
          multiple={multiple}
          disablePortal
          options={allField}
          value={getValues(field.name)}
          sx={{ width: 300 }}
          size="small"
          onChange={(_, selectVal) => {
            let newVal = selectVal ?? (multiple ? [] : "");
            if (
              multiple &&
              checkAllSelection &&
              newVal.find((item) => item.value === "(ALL)")
            ) {
              newVal = [options[0]];
            }
            field.onChange(newVal);
            if (onChange) {
              onChange(newVal);
            }
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      )}
    />
  );
};
export const allField = [
  { label: "Vessel IMO Number", value: "vesselImoNumber" },
  { label: "MMSI Number", value: "MMSINumber" },
  { label: "Voyage Number", value: "voyageNumber" },
  { label: "Visit Reason", value: "visitReason" },
  { label: "Last Port Of Call", value: "lastPortOfCall" },
  { label: "Next Port Of Call", value: "nextPortOfCall" },
  { label: "Has Defect", value: "hasDefect" },
  { label: "Remark", value: "remark" },
  { label: "Agent Company", value: "agentCompany" },
  { label: "Arrival From Location", value: "arrivalFromLocation" },
  { label: "Arrival To Location", value: "arrivalToLocation" },
  { label: "Arrival SRT", value: "arrivalSRT" },
  { label: "Departure From Location", value: "departureFromLocation" },
  { label: "Departure To Location", value: "departureToLocation" },
  { label: "Departure SRT", value: "departureSRT" },
  {
    label: "Visit Reference Number",
    value: "vesselVisitReferenceNumber",
  },
  { label: "Visit Status", value: "vesselVisitStatus" },
];

const Step2 = () => {
  const { getValues, setValue } = useFormContext();
  const allLabels = getValues("label");

  useEffect(() => {
    allField?.map((item, index) => {
      setValue(item?.value, allLabels?.[index]);
    });
  }, []);
  return (
    <>
      <Typography variant="h6">INSTRUCTIONS:</Typography>
      <p>Map columns in the excel sheet to the respective required columns.</p>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6">
          Required columns to create the vessel visit
        </Typography>
        <Typography variant="h6">Columns from excel sheet</Typography>
      </Box>
      {allField.map((item) => {
        return (
          <Box key={item.value} display="flex" justifyContent="space-between">
            <Typography variant="subtitle2">{item.label}</Typography>
            <InputFieldOptions name={item.value} allField={allLabels} />
          </Box>
        );
      })}
    </>
  );
};

export default Step2;
