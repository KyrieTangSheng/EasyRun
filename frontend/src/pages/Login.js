import React, {useState} from 'react'
import { Paper, Avatar, Typography, Link, 
        Box, TextField, MenuItem, Button, Collapse, IconButton} from '@mui/material'
import DirectionsRunIcon from '@mui/icons-material/Directions';
import CloseIcon from '@mui/icons-material/Close';
import AccountServices from '../services/account';
import Alert from '@mui/material/Alert';


export default function Login() {


  const paperStyle = {padding :20, width:400, margin: "150px"}
  const avatarStyle = {backgroundColor: "#17adb08f", width:45, height:45 }

  // handle values
  const [values, setValues] = useState({
    email: "",
    pwd: ""
  })

  const [usertype,setUserType]=useState("");
  const [showAlert, setShowAlert] = useState(false); // for alert

  const handleEmail = (e) => {
    e.preventDefault();
    let email = e.target.value;
    setValues({ ...values, email: email });
  }

  const handlePassword = (e) => {
      e.preventDefault();
      let password = e.target.value;
      setValues({ ...values, pwd: password });
  }

  const handleUserType = (e) => {
      e.preventDefault();
      let usertype = e.target.value;
      setUserType(usertype)
  }

  // handle Errors
  let formErrors = {
    loginError: { status: "success", msg: "" },
    emailError: { status: false, msg: "" },
    passwordError: { status: false, msg: "" },
    usertypeError: { status: false, msg: "" }
  };

  const[errors, setErrors] = useState(formErrors);


  const handleSubmit = (e)=>{
    e.preventDefault();
    setErrors(formErrors);
    console.log("re-rendered")
    localStorage.setItem("isLoggedIn", false);

    if (values.email.length === 0) {
      setErrors({...errors, emailError: { status: true, msg: "Please enter your email address"} });
  }
    //valid email
    else if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(values.email) === false) {
        setErrors({...errors, emailError: { status: true, msg: "Please enter a valid email address"} });
    }
    // valid password
    else if (values.pwd.length === 0) {
        setErrors({...errors, passwordError: { status: true, msg: "Please enter your password"} });
    }
    else if (usertype.length === 0) {
        setErrors({...errors, usertypeError: { status: true, msg: "Please select your user type."} });
    }
    else{
      let loginInfo = values

      AccountServices.login(loginInfo, usertype)
            .then(response => response.json())
            .then(result=>{
              if (result.status === 1) {
                localStorage.isLoggedIn = true; // user logged in 
                localStorage.setItem("userType", usertype)
                localStorage.setItem("userInfo", result.data)
                setErrors({...errors, loginError: { status: "success", msg: "Login Success."} });
                setShowAlert(true)           
                setTimeout(() => {
                  window.location.href="./home/profile";
                }, 3000);
              }
              else { // handle the fail login conditions
                if (result.code === 3) { // email error
                  setErrors({...errors, loginError: { status: "error", msg: "Email Does Not Exist."} });
                  setShowAlert(true)
                }
                else if (result.code === 2) { // password error
                  setErrors({...errors, loginError: { status: "error", msg: "Password Incorrect."} });
                  setShowAlert(true)
                }
              }
           })
           .catch(err => {
            return err
           });
      }
    }


    //   AccountServices.updateStudentProfile()
    //   .then(response => response.json())
    //   .then(result=>{
    //     console.log(result.data)
    //     //window.location.href="./";
    // })


  return (
    <div align="center">
      {showAlert? <Collapse in={showAlert}>
                  <Alert
                    severity={errors.loginError.status}
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setShowAlert(false);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                    sx={{ mb: 2 }}
                  >
                    {errors.loginError.msg}
                  </Alert>
                </Collapse> : <></>}



      <Paper style={paperStyle} variant="outlined">
        <Avatar style={avatarStyle}><DirectionsRunIcon /></Avatar>
        <h2>Let's Run</h2>
        <Box 
          align="center" 
          component="form" 
          onSubmit={handleSubmit}
          sx={{'& .MuiTextField-root': { m: 1, width: '40ch' },}} 
          noValidate 
          autoComplete="off">
            
              {/* Email Field*/}
              <TextField 
                required 
                type="email"
                id="email" 
                label="Email"
                onChange={handleEmail}
                value={values.email}
                error={errors.emailError.status}
                helperText={errors.emailError.msg}
                />

              {/* Password Field*/}
              <TextField 
                required 
                type="password"
                id="password" 
                label="Password"
                onChange={handlePassword}
                value={values.pwd}
                error={errors.passwordError.status}
                helperText={errors.passwordError.msg}
                />

              {/* Log in Role Field*/}
              <TextField 
                required 
                id="outlined-select-role" 
                select 
                label="Login As" 
                value={usertype} 
                onChange={handleUserType}
                error={errors.usertypeError.status}
                helperText={errors.usertypeError.msg}
                >
                  <MenuItem value={"student"}>Student</MenuItem>
                  <MenuItem value={"instructor"}>Instructor</MenuItem>
              </TextField>

              {/* Button */}
              <Button 
              type="submit" 
              sx={{ m: 1, width: '40ch' }} 
              style={{backgroundColor: "#328059"}} 
              fontSize="18px" 
              variant="contained">
                Sign In
              </Button>
            <Typography 
              align="center" 
              fontSize="12px"> Do not have an account? 
              <Link 
                href='./register' 
                fontSize="18px">
                Join Run Club now!
              </Link>
            </Typography>   
        </Box>
      </Paper>
    </div>
  )
}

