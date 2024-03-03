import { Button, Input, Typography, styled } from "@mui/material";
import React, { useState } from "react";
import * as XLSX from "xlsx";

const Step1 = () => {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState([{}]);
  const [labelList, setLabelList] = useState([]);

  const handleConvert = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        const allLabel = Object.keys(json[0]).map((label) => {
          return { label: label, value: label.replaceAll(" ", "") };
        });
        setJsonData(json);
        setLabelList(allLabel);
      };
      reader.readAsBinaryString(file);
    }
  };
  return (
    <div>
      <Typography variant="h6">INSTRUCTIONS:</Typography>
      <p>
        Select a file to upload. Only Excel Files with the following extensions
        are supported: *.xls, *.xlsx
      </p>
      <Button component="label" variant="contained" tabIndex={-1}>
        Choose File
        <VisuallyHiddenInput type="file" accept=".xls,.xlsx" />
      </Button>
    </div>
  );
};

export default Step1;
