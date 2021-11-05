import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Controller, useFormContext } from 'react-hook-form';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 150,
      width: 250,
    },
  },
};

const skills = [
  'HTML',
  'CSS',
  'Javascipt',
  'React JS',
  'Vue JS',
  'Angular JS',
  'Node JS',
  'Typescipt',
  'PHP',
  'Laravel',
];

const InputTypeSelectSkills = ({ oldValue }) => {
  const {
    control,
    trigger,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name="skills"
      defaultValue={oldValue}
      render={({ field: { value, onChange } }) => {
        // console.log(value);
        return (
          <TextField
            select
            fullWidth
            label={<strong>Kiến thức</strong>}
            error={!!errors.skills}
            helperText={errors.skills?.message}
            SelectProps={{
              multiple: true,
              value: value === undefined ? [] : value,
              renderValue: (selected) => selected.join(', '),
              onChange: onChange,
              MenuProps: MenuProps,
            }}
            variant="standard"
            margin="dense"
            onKeyUp={async () => {
              await trigger('skills');
            }}
          >
            {skills.map((n) => (
              <MenuItem key={n} value={n}>
                <Checkbox checked={value.includes(n)} />
                <ListItemText primary={n} />
              </MenuItem>
            ))}
          </TextField>
        );
      }}
    />
  );
};

export default InputTypeSelectSkills;
