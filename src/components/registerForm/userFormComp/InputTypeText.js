import React from 'react';
import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';

const InputTypeText = ({ name, label, oldValue }) => {
  const {
    control,
    trigger,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={oldValue}
      render={({ field }) => {
        return (
          <TextField
            {...field}
            type="text"
            fullWidth={true}
            label={<strong>{label}</strong>}
            error={!!errors[name]}
            helperText={errors[name]?.message}
            variant="standard"
            margin="dense"
            onKeyUp={async () => {
              await trigger([name]);
            }}
          />
        );
      }}
    />
  );
};

export default InputTypeText;
