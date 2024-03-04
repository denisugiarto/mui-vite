import { TextField } from "@mui/material"
import { KeyboardEvent, ReactElement } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { camelCaseToTitle } from "../../utils/camelCaseToTitle"
import { ContainerLayoutType, GridInput, ItemLayoutType } from "./GridForm"

export interface InputParam<TData> {
  name: keyof TData
  required?: boolean
  disabled?: boolean
  removeSpecialChar?: boolean
  onChange?: (newValue: string) => void
  onKeyDown?: (event: KeyboardEvent) => void
  multiline?: boolean
  minRows?: number
  maxRows?: number
  rows?: number
  label?: string
  type?: "text" | "number" | "date" | "time" | "datetime-local"
  error: any
}

export function GridInputTextField<TData>({
  caption,
  itemLayout,
  captionLayout,
  inputLayout,
  name,
  label,
  ...others
}: InputParam<TData> & {
  caption: string
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
      <InputTextField<TData> name={name} label={label} {...others} />
    </GridInput>
  )
}

const checkOnKeyDown = (
  event: KeyboardEvent,
  onKeyDown: (event: KeyboardEvent) => void
) => {
  if (/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(event.key)) {
    event.preventDefault()
  }
  if (onKeyDown) {
    onKeyDown(event)
  }
}

export default function InputTextField<TData>({
  name,
  required = false,
  disabled = false,
  removeSpecialChar = false,
  onChange,
  onKeyDown,
  multiline = false,
  minRows = 1,
  maxRows = 2,
  rows = undefined,
  type = "text",
  label = "",
  error,
  ...props
}: InputParam<TData>): ReactElement {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const onKeyDownHandler = removeSpecialChar
    ? (event: KeyboardEvent) => checkOnKeyDown(event, onKeyDown!)
    : onKeyDown

  const getFieldValue = (data: any, fieldName: string | number | symbol) =>
    fieldName
      .toString()
      .replace(/\[(\d+)\]/g, ".$1")
      .split(".")
      .reduce((obj, prop) => obj && obj[prop], data)

  const errorState = getFieldValue(errors, name)
  return (
    <Controller
      name={name as string}
      control={control}
      rules={{ required: required }}
      render={({ field }) => (
        <TextField
          label={label}
          InputLabelProps={{ shrink: true }}
          type={type}
          multiline={multiline}
          sx={
            multiline
              ? {
                  "& .MuiInputBase-root": {
                    height: "auto",
                    padding: "10px",
                    lineHeight: "1.6",
                  },
                }
              : undefined
          }
          minRows={multiline === true ? minRows : undefined}
          maxRows={multiline === true ? maxRows : undefined}
          rows={rows}
          fullWidth
          disabled={disabled}
          onBlur={field.onBlur}
          onKeyDown={onKeyDownHandler}
          onChange={(ev) => {
            const newVal = ev.target.value ?? ""
            field.onChange(newVal)
            if (onChange) {
              onChange(newVal)
            }
          }}
          required={required}
          value={field.value}
          // value={getValues(field.name) ?? ""}
          error={error ? error : errorState ? true : false}
          {...props}
        />
      )}
    />
  )
}
