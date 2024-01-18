 // fields = ("name", "start_date", "end_date", "comments", "status");

 import * as React from "react";
import TextField from "@mui/material/TextField";
 import {Controller} from "react-hook-form";

export default function MyTextField(props) {
  const { label,placeholder,name,control } = props;
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          fullWidth
          onChange={onChange}
          value={value}
          id="outlined-basic"
          label={label}
          variant="outlined"
          placeholder={placeholder}
          error={!!error}
          helperText={error ? error.message : null}
        />
      )}
    />
  );
 }