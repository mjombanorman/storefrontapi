import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Controller } from "react-hook-form";
import { FormHelperText } from "@mui/material";
export default function MySelectField(props) {
  const { label, name, control,options } = props;

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="select-label">{label}</InputLabel>
        <Controller
          name={name}
          control={control}
          render={({
            field: { onChange, value },
            fieldState: { error },
            formState,
          }) => (
            <>
              <Select
                onChange={onChange}
                value={value}
                label={label}
                name={name}
                error={!!error}>
                
                { options.map((option) => (<MenuItem value={option.id}>{option.name}</MenuItem>)) }
                
            
              </Select>
              <FormHelperText sx={{color:"#d32f2f"}}>{error?.message}</FormHelperText>
            </>
          )}
        />
      </FormControl>
    </Box>
  );
}
