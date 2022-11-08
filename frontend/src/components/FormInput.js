import React from 'react'
import { useState } from 'react';
import TextField from '@mui/material/TextField';

export default function FormInput(props) {
  const [values, setValues] = useState({
    email:"",
    password:"",
    // password
  })
  return (
    <div className='formInput'>
        <TextField required id="filled-required" label="Email"/>
    </div>
  )
}
