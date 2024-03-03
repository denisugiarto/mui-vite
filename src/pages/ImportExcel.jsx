import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import * as XLSX from "xlsx";

/**
 *
 * @returns Feature to create multiple vessel visit from excel spreadsheet
 * @description Has 4 step (Upload File, Mapping Data, Preview, Result)
 * Upload file step for select the spreadsheet file
 * Mapping Data for select column in spreadsheet to match with label
 * Preview for render the data from spreadsheet with label
 * Result for show the status each row data after sent to server
 */

const ImportExcel = () => {
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
      <input
        type="file"
        accept=".xls,.xlsx"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleConvert}>Convert</button>
      <pre>{JSON.stringify(jsonData, null, 2)}</pre>
      <h3>All Label</h3>
      {/* <pre>{Object.keys(jsonData[0])}</pre> */}
      <Autocomplete
        name="test"
        options={labelList}
        renderInput={(params) => <TextField {...params} />}
      />
    </div>
  );
};

export default ImportExcel;
