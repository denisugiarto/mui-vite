import React from "react";
import { useFormContext } from "react-hook-form";

function NestedInput() {
  const { register } = useFormContext(); // retrieve all hook methods
  return <input {...register("test")} />;
}

export default NestedInput;
