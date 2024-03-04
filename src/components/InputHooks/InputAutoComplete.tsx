import { Controller, useFormContext } from "react-hook-form"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import React, { ReactElement } from "react"
import { ItemLayoutType, ContainerLayoutType, GridInput } from "./GridForm"
import { camelCaseToTitle } from "../../utils/camelCaseToTitle"

// import { styled } from "@mui/material"
// Notes:
// - default options is Array of { label, value },
//   we have to override getOptionLabel and getOptionSelected if not.

type InputParam<TData> = {
  name: keyof TData
  required?: boolean
  disabled?: boolean
  options: any[]
  getOptionLabel?: (opt: any) => string
  isOptionEqualToValue?: (option: any, value: any) => boolean
  onChange?: (newValue: any) => void
  onBlur?: (newValue: any) => void
  multiple?: boolean
  disableCloseOnSelect?: boolean
  checkAllSelection?: boolean
  placeholder?: string
  error: any
}

export function GridInputAutoComplete<TData>({
  caption,
  itemLayout,
  captionLayout,
  inputLayout,
  name,
  ...others
}: InputParam<TData> & {
  caption?: string
  itemLayout?: ContainerLayoutType & ItemLayoutType
  captionLayout?: ItemLayoutType
  inputLayout?: ItemLayoutType
}): ReactElement {
  if (!caption) {
    caption = camelCaseToTitle(String(name))
  }
  return (
    <GridInput
      caption={caption}
      itemLayout={itemLayout}
      captionLayout={captionLayout}
      inputLayout={inputLayout}
      required={others.required}
    >
      <InputAutoComplete<TData> name={name} {...others} />
    </GridInput>
  )
}

export function InputAutoComplete<TData>({
  name,
  required = false,
  disabled = false,
  options = [],
  getOptionLabel = (opt) => opt.label ?? "",
  isOptionEqualToValue = (opt1: any, opt2: any) => opt1.value === opt2.value,
  onChange,
  multiple = false,
  disableCloseOnSelect = false,
  checkAllSelection = false,
  placeholder,
  onBlur,
  error,
  ...other
}: InputParam<TData>): ReactElement {
  const {
    control,
    getValues,
    formState: { errors },
  } = useFormContext()
  // const StyledAutocomplete = multiple
  //   ? styled(Autocomplete)({
  //       ["& .MuiAutocomplete-inputRoot"]: {
  //         height: "auto",
  //       },
  //     })
  //   : Autocomplete
  // const iacStyle = `
  // .iac_style .MuiAutocomplete-input{
  //   margin-Top:-6px;
  // }`
  const getFieldValue = (data: any, fieldName: string | number | symbol) =>
    fieldName
      .toString()
      .replace(/\[(\d+)\]/g, ".$1")
      .split(".")
      .reduce((obj, prop) => obj && obj[prop], data)

  const errorState = getFieldValue(errors, name)

  return (
    // <>
    //   <style>{iacStyle}</style>
    //   <div className="iac_style">
    <Controller
      name={name as string}
      control={control}
      rules={{ required: required }}
      render={({ field }) => (
        <Autocomplete
          multiple={multiple}
          isOptionEqualToValue={isOptionEqualToValue}
          filterSelectedOptions={multiple}
          disabled={disabled}
          options={options}
          fullWidth
          getOptionLabel={(opt) => getOptionLabel(opt) ?? ""}
          onBlur={onBlur ? onBlur : field.onBlur}
          disableCloseOnSelect={disableCloseOnSelect}
          onChange={(_, selectVal) => {
            let newVal: any = selectVal ?? (multiple ? [] : "")
            if (
              multiple &&
              checkAllSelection &&
              newVal.find((item: any) => item.value === "(ALL)")
            ) {
              newVal = [options[0]]
            }
            field.onChange(newVal)
            if (onChange) {
              onChange(newVal)
            }
          }}
          value={getValues(field.name) ?? (multiple ? [] : "")}
          // sx={{
          //   "& button": {
          //     marginTop: "-4px",
          //   },
          // }}
          sx={
            multiple
              ? {
                  "& .MuiAutocomplete-inputRoot": {
                    height: "auto",
                  },
                }
              : undefined
          }
          renderInput={(p) => (
            <TextField
              {...p}
              sx={{
                "& input": {
                  marginLeft: "5px",
                },
              }}
              // sx={{
              //   "& input": {
              //     marginTop: "-2px",
              //     marginLeft: "-8px",
              //     height: "0px",
              //   },
              // }}
              // variant="outlined"
              // hiddenLabel={true}
              // margin={"none"}
              placeholder={placeholder}
              error={error ? error : errorState ? true : false}
            />
          )}
          {...other}
        />
      )}
    />
    //   </div>
    // </>
  )
}

export default InputAutoComplete
