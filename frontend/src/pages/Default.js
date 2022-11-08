import React from 'react'
import SearchCards from '../components/SearchCards';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';
import { Box } from '@material-ui/core';


export default function Defualt() {
  
  return (
  <>
    <Box
      component="ul"
      sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}
      
    >
        <SearchCards component="li"
                  sx={{ minWidth: 300, flexGrow: 1 }}
                  left="5%" 
                  top={100}
                  header="Institutions"
                  body="click to search intermediate institutions"
                  intro="This section collected intermediate institutions. 
                  We'll show you a list of institutions, and each institution
                  with its rating from their enrolled students." 
                  icon={<BusinessIcon/>}
                  page="./institutions"
                  />
        <SearchCards component="li"
                  sx={{ minWidth: 300, flexGrow: 1 }}
                  left="35%" 
                  top={-314}
                  header="Master Programs"
                  body="click to search master programs"
                  intro="This section collected master programs. We'll
                  show you a list of master programs, and you can specify 
                  some keywords for mapping." 
                icon={<SchoolIcon/>}
                page="./programs"
                  />
      </Box>
  </>

  )
}
