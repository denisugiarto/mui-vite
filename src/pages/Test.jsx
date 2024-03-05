import { FormProvider, useForm } from "react-hook-form";
import NestedInput from "./ImportExcel/components/NestedInput";

export default function Test() {
  const methods = useForm();
  const onSubmit = (data) => console.log(data);
  const { getValues } = methods;
  console.log(getValues());

  return (
    <FormProvider {...methods}>
      <NestedInput />
      <button onClick={() => onSubmit(getValues())}>submit</button>
    </FormProvider>
  );
}
