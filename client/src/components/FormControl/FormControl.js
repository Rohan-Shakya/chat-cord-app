import React from 'react';
import {
  FormControlDiv,
  FormControlLabel,
  FormControlInput,
} from './FormControl.styles';

export const FormControl = ({ label, type, name, handleChange, value }) => {
  return (
    <FormControlDiv>
      <FormControlLabel htmlFor={name}>{label}</FormControlLabel>
      <FormControlInput
        type={type}
        name={name}
        onChange={handleChange}
        value={value}
        required
      />
    </FormControlDiv>
  );
};
