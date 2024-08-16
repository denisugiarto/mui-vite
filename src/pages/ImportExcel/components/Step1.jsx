// import { Button, Input, Typography, styled } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { useFormContext } from "react-hook-form";
// import * as XLSX from "xlsx";

// const findIndexObjectWithLongestKey = (arr) => {
//   const keyLengths = arr.map((obj) =>
//     Math.max(...Object.keys(obj).map((key) => key.length))
//   );
//   const indexOfLongestKey = keyLengths.indexOf(Math.max(...keyLengths));
//   return indexOfLongestKey;
// };

// const Step1 = () => {
//   const VisuallyHiddenInput = styled("input")({
//     clip: "rect(0 0 0 0)",
//     clipPath: "inset(50%)",
//     height: 1,
//     overflow: "hidden",
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     whiteSpace: "nowrap",
//     width: 1,
//   });
//   const [file, setFile] = useState(null);

//   const { getValues, setValue } = useFormContext();

//   const handleConvert = () => {
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const data = e.target.result;
//         const workbook = XLSX.read(data, { type: "binary" });
//         const sheetName = workbook.SheetNames[0];
//         const worksheet = workbook.Sheets[sheetName];
//         const json = XLSX.utils.sheet_to_json(worksheet, {
//           defval: null,
//         });

//         const allLabel = Object.keys(json[0]).map((label) => {
//           return { label: label, value: label.replaceAll(" ", "") };
//         });
//         setValue("data", json);
//         setValue("label", allLabel);
//       };
//       reader.readAsBinaryString(file);
//     }
//   };

//   useEffect(() => {
//     console.log(file);
//     handleConvert();
//   }, [file]);
//   return (
//     <div>
//       <Typography variant="h6">INSTRUCTIONS:</Typography>
//       <p>
//         Select a file to upload. Only Excel Files with the following extensions
//         are supported: *.xls, *.xlsx
//       </p>
//       <Button component="label" variant="contained" tabIndex={-1}>
//         Choose File
//         <VisuallyHiddenInput
//           type="file"
//           accept=".xls,.xlsx"
//           onChange={(e) => setFile(e.target.files[0])}
//         />
//       </Button>
//     </div>
//   );
// };

// export default Step1;
