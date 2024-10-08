import { Typography } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";

const Step4 = () => {
  const { getValues } = useFormContext();
  const submitData = getValues("submitData");
  console.log("🚀 ~ Step4 ~ submitData:", submitData);
  return (
    <>
      <Typography variant="h6">Summary:</Typography>
      {/* Table Result
      No, Vessel IMO Number, Vessel MMSI Number, VOyage Number, Visit Reason, Agent Company, Arrival from Location, Arrival to location, arrival SRT, status, message
      Status: success => message created
      failed=> message
      */}
    </>
  );
};

export default Step4;
