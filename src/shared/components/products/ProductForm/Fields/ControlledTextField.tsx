import TextField from "@material-ui/core/TextField";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface ControlledTextInputProps {
  name: string;
  label: string;
  multiline?: boolean;
  type?: string;
  required?: boolean;
  inputProps?: {
    endAdornment?: JSX.Element;
  };
}

const ControlledTextInput: React.FC<ControlledTextInputProps> = (
  props: ControlledTextInputProps
) => {
  const {
    name,
    label,
    multiline,
    inputProps,
    type = "string",
    required = true,
  } = props;

  const { errors, control } = useFormContext();

  return (
    <Controller
      control={control}
      as={TextField}
      name={name}
      defaultValue=""
      variant="outlined"
      fullWidth
      required={required}
      label={label}
      error={errors[name] !== undefined}
      helperText={errors[name]?.message}
      multiline={multiline}
      type={type}
      InputProps={inputProps}
    />
  );
};

export default ControlledTextInput;
