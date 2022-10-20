import React from 'react'
import { Grid, Paper, Avatar, Typography, Link} from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';



const roles = [
  {
    value: 'student',
    label: 'student',
  },
  {
    value: 'instructor',
    label: 'instructor',
  },
];

export default function Login() {

  const paperStyle = {padding :20, height: '60vh', width:400, margin: "150px auto"}
  const avatarStyle = {backgroundColor: "green"}

  const [role, setRole] = React.useState('');
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });

  const handleChangeRole = (event) => {
    console.log(event.target.value)
    setRole(event.target.value);
  };

  const handleChangePasswordViz = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}><LockIcon/></Avatar>
          <h2>Let's Run</h2>
        </Grid>
        <Box align="center" component="form" sx={{'& .MuiTextField-root': { m: 1, width: '40ch' },}} noValidate autoComplete="off">
          <div>

            {/* Email Field*/}
            <TextField required id="filled-required" label="Email"/>

            {/* Password Field*/}
            <FormControl required sx={{ m: 1, width: '40ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChangePasswordViz('password')}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
              </FormControl>

            {/* Log in Role Field*/}
            <TextField required id="outlined-select-role" select label="Login As" value={role} onChange={handleChangeRole}
            helperText="Please select your user type">
                {roles.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>))}
            </TextField>

            {/* Button */}
            <Button type="submit" sx={{ m: 1, width: '40ch' }} style={{backgroundColor: "black"}} fontSize="18px" variant="contained">Sign In</Button>
          </div>
        </Box>
        <br />
        <Typography align="center" fontSize="12px"> Do not have an account? <br />
          <Link href='#' fontSize="18px">Join Run Club now!</Link>
        </Typography>

      </Paper>
    </Grid>
  )
}
