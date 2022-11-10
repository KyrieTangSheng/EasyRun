import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
// import {Button, Box} from '@mui/material'


export default function Home() {


  return (
    <>
      <Header/>
      <Outlet/>
      {/* <Box display="flex">
            <Button
              variant="contained"
              size="small"
              style={{ backgroundColor: "rgb(19, 115, 134)" }}
              href="./"
            >
              return
            </Button>
          </Box> */}
    </>
  )
}

