import React, { useState } from 'react';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { addLink } from '../../store/reducers/takeCareSlice';
import { useDispatch } from 'react-redux';

export const InputForm = () => {
  const [input, setInput] = useState('');

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addLink(input));
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        placeholder="Placeholder"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button variant="contained" type="submit" size="small">
        Thêm
      </Button>
    </form>
  );
};
