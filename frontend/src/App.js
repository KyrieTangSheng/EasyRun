import React from 'react'
import Button from '@mui/material/Button';
import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <>    
      <Button variant="contained" color="success">Success</Button>
      <Outlet />
    </>
  )
}

