import { Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

function combineObjects(data, fields) {
  const result = {};
  for (const key in fields) {
    if (fields.hasOwnProperty(key) && data.hasOwnProperty(fields[key])) {
      result[key] = data[fields[key]];
    }
  }
  return result;
}

export const columns = [
  { field: "id" },
  { field: "vesselImoNumber", headerName: "Vessel IMO Number" },
  { field: "MMSINumber", headerName: "MMSI Number" },
  { field: "voyageNumber", headerName: "Voyage Number" },
  { field: "visitReason", headerName: "Visit Reason" },
  { field: "lastPortOfCall", headerName: "Last Port Of Call" },
  { field: "nextPortOfCall", headerName: "Next Port Of Call" },
  { field: "hasDefect", headerName: "Has Defect" },
  { field: "remark", headerName: "Remark" },
  { field: "agentCompany", headerName: "Agent Company" },
  { field: "arrivalFromLocation", headerName: "Arrival From Location" },
  { field: "arrivalToLocation", headerName: "Arrival To Location" },
  { field: "arrivalSRT", headerName: "Arrival SRT" },
  { field: "departureFromLocation", headerName: "Departure From Location" },
  { field: "departureToLocation", headerName: "Departure To Location" },
  { field: "departureSRT", headerName: "Departure SRT" },
  {
    field: "vesselVisitReferenceNumber",
    headerName: "Visit Reference Number",
  },
  { field: "vesselVisitStatus", headerName: "Visit Status" },
  { field: "message", headerName: "Message" },
  { field: "status", headerName: "Status" },
];
const Step3 = () => {
  const { getValues, setValue } = useFormContext();

  const allData = getValues("data");
  const allFields = getValues();
  delete allFields.data;
  delete allFields.label;
  const convertedData = {};

  for (const key in allFields) {
    if (Object.hasOwnProperty.call(allFields, key)) {
      convertedData[key] = allFields[key].label;
    }
  }
  const previewData = allData.map((item, index) => {
    return { id: index, ...combineObjects(item, convertedData) };
  });
  useEffect(() => {
    console.log(previewData);
    setValue("submitData", previewData);
  }, [previewData]);
  return (
    <>
      <Typography variant="h6">INSTRUCTIONS:</Typography>
      <p>This is a Preview of the data that will imported</p>
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid rows={previewData} columns={columns} />
      </div>
    </>
  );
};

export default Step3;
