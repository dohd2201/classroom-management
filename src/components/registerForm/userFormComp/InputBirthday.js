import React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { Controller, useFormContext } from 'react-hook-form';

const InputBirthday = ({ oldValue }) => {
  const {
    control,
    trigger,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name="birthday"
      control={control}
      defaultValue={new Date(oldValue)}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            {...field}
            label={<strong>Ngày sinh</strong>}
            disableFuture
            maxDate={new Date('2010-01-01')}
            minDate={new Date('1970-01-01')}
            openTo="year"
            views={['year', 'month', 'day']}
            renderInput={(params) => (
              <TextField
                {...params}
                name="birthday"
                fullWidth
                error={!!errors.birthday}
                helperText={errors.birthday?.message}
                variant="standard"
                margin="dense"
                onKeyUp={() => {
                  trigger('birthday');
                }}
              />
            )}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default InputBirthday;
