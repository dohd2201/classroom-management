import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import { Controller, useFormContext } from 'react-hook-form';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 150,
      width: 250,
    },
  },
};

const InputTypeSelect = ({ name, label, options, type, oldValue }) => {
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
            select
            SelectProps={{ MenuProps: MenuProps }}
            fullWidth
            label={<strong>{label}</strong>}
            error={!!errors[name]}
            helperText={errors[name]?.message}
            variant="standard"
            margin="dense"
            onKeyUp={async () => {
              await trigger([name]);
            }}
          >
            {type === 'address'
              ? options.map((p) => <MenuItem value={p.name}>{p.name}</MenuItem>)
              : options.map((p) => <MenuItem value={p.v}>{p.n}</MenuItem>)}
          </TextField>
        );
      }}
    />
  );
};

export default InputTypeSelect;
