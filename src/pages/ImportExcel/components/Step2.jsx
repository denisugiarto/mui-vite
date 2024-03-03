import {
  Autocomplete,
  Box,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const UploadColumns = ({ allField, value }) => {
  return (
    <Autocomplete
      disablePortal
      options={allField}
      value={value}
      sx={{ width: 300 }}
      size="small"
      renderInput={(params) => <TextField {...params} />}
    />
  );
};
const allField = [
  { label: "Vessel IMO Number", value: "vesselImoNumber" },
  { label: "Voyage Number", value: "voyageNumber" },
  { label: "Visit Reason", value: "visitReason" },
  { label: "Last Port Of Call", value: "lastPortOfCall" },
  { label: "Next Port Of Call", value: "nextPortOfCall" },
  { label: "Remark", value: "remark" },
  { label: "Agent Company", value: "agentCompany" },
  { label: "Arrival From Location", value: "arrivalFromLocation" },
  { label: "Arrival To Location", value: "arrivalToLocation" },
  { label: "Arrival SRT", value: "arrivalSRT" },
  {
    label: "Visit Reference Number",
    value: "vesselVisitReferenceNumber",
  },
  { label: "Visit Status", value: "vesselVisitStatus" },
];
const allFieldUploaded = [
  { label: "Vessel IMO Number", value: "vesselImoNumber" },
  { label: "Voyage Number", value: "voyageNumber" },
  { label: "Visit Reason", value: "visitReason" },
  { label: "Last Port Of Call", value: "lastPortOfCall" },
  { label: "Next Port Of Call", value: "nextPortOfCall" },
  { label: "Remark", value: "remark" },
  { label: "Agent Company", value: "agentCompany" },
  { label: "Arrival From Location", value: "arrivalFromLocation" },
  { label: "Arrival To Location", value: "arrivalToLocation" },
  { label: "Arrival SRT", value: "arrivalSRT" },
  {
    label: "Vessel Visit Reference Number",
    value: "vesselVisitReferenceNumber",
  },
  { label: "Vessel Visit Status", value: "vesselVisitStatus" },
];
const Step2 = () => {
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
      {allField.map((item, index) => {
        return (
          <Box key={item.value} display="flex" justifyContent="space-between">
            <Typography variant="subtitle2">{item.label}</Typography>
            <UploadColumns
              allField={allFieldUploaded}
              value={allFieldUploaded[index]}
            />
          </Box>
        );
      })}
    </>
  );
};

export default Step2;
