import React, {useState, useEffect} from 'react'
import { Paper, Avatar, Typography, Link, 
        Box, TextField, MenuItem, Button, Collapse, IconButton} from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import AccountServices from '../services/account';


export default function Register() {


  const paperStyle = {padding :20, width:400, margin: "150px"}
  const avatarStyle = {backgroundColor: "green"}

  // handle values
  const [values, setValues] = useState({
    email: "",
    userName: "",
    pwd: "",
    dob: "1953-06-15",
    confirmedPassword: "",  
    // undergradSchool: "", 
    // overallGPA: "", 
    // majorGPA: "",
    // toeflScore: "",
    // greScore: "",
    // reserachExperience: "",
    // intershipExperience: "",
    institutionName: ""
  })

  const [usertype, setUserType] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [showAlert, setShowAlert] = useState(false); // for alert
  const [InsData, setInsData] = useState([]);


  useEffect(()=>{
    if (usertype === "instructor"){
        AccountServices.getInstitutions()
        .then(response => response.json())
        .then(result=>{
          setInsData(JSON.parse(result.data))
      })
    }
  }, [usertype])

  const handleEmail = (e) => {
    e.preventDefault();
    let email = e.target.value;
    setValues({ ...values, email: email });
  }
  const handleUsername = (e) => {
    e.preventDefault();
    let username = e.target.value;
    setValues({ ...values, userName: username });
  }

  const handlePassword = (e) => {
      e.preventDefault();
      let password = e.target.value;
      setValues({ ...values, pwd: password });
  }

  const handleConfirmedPassword = (e) => {
    e.preventDefault();
    let confirmedPassword = e.target.value;
    setValues({ ...values, confirmedPassword: confirmedPassword });
  }

  const handleIns = (e) => {
    e.preventDefault();
    let ins = e.target.value;
    setValues({ ...values, institutionName: ins});
  }

  // const handleUndergradSchool = (e) => {
  //   e.preventDefault();
  //   let undergradSchool = e.target.value;
  //   setValues({ ...values, undergradSchool: undergradSchool });
  // }
  // const handleOverallGPA = (e) => {
  //   e.preventDefault();
  //   let overallGPA = e.target.value;
  //   setValues({ ...values, overallGPA: overallGPA });
  // }

  // const handleMajorGPA = (e) => {
  //   e.preventDefault();
  //   let majorGPA = e.target.value;
  //   setValues({ ...values, majorGPA: majorGPA });
  // }

  // const handleToeflScore = (e) => {
  //   e.preventDefault();
  //   let tofelScore = e.target.value;
  //   setValues({ ...values, tofelScore: tofelScore });
  // }

  // const handleGREScore = (e) => {
  //   e.preventDefault();
  //   let greScore = e.target.value;
  //   setValues({ ...values, greScore: greScore });
  // }

  // const handleReserachExperience = (e) => {
  //   e.preventDefault();
  //   let reserachExperience = e.target.value;
  //   setValues({ ...values, reserachExperience: reserachExperience });
  // }

  // const handleIntershipExperience = (e) => {
  //   e.preventDefault();
  //   let intershipExperience = e.target.value;
  //   setValues({ ...values, intershipExperience: intershipExperience });
  // }

  const handleUserType = (e) => {
      e.preventDefault();
      let usertype = e.target.value;
      setUserType(usertype);
  }

  // handle Errors
  let formErrors = {
    emailError: { status: false, msg: "" },
    usernameError: { status: false, msg: "" },
    passwordError: { status: false, msg: "" },
    confirmedPasswordError: { status: false, msg: "" },
    // undergradSchoolError: { status: false, msg: "" },
    // overallGPAError: { status: false, msg: "" },
    // majorGPAError: { status: false, msg: "" },
    // toeflScoreError: { status: false, msg: "" },
    // greScoreError: { status: false, msg: "" },
    // reserachExperience: { status: false, msg: "" },
    // intershipExperience: { status: false, msg: "" },
    usertypeError: { status: false, msg: "" },
    insError: { status: false, msg: "" },
    registerError: {status: "success", msg: ""}
  };

  const[errors, setErrors] = useState(formErrors);

  const handleSubmit = (e)=>{
    e.preventDefault();
    setErrors(formErrors);
    
    localStorage.setItem("isLoggedIn", false);


    if (usertype.length === 0) {

      setErrors({...errors, usertypeError: { status: true, msg: "Please select your user type."} });
    }
    //valid email
    else if (values.email.length === 0) {
      setErrors({...errors, emailError: { status: true, msg: "Please enter your email address"} });
    }
    // valid email
    else if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(values.email) === false) {
      setErrors({...errors, emailError: { status: true, msg: "Please enter a valid email address"} });
    }
    // valid username
    else if (values.userName.length === 0){
      setErrors({...errors, usernameError: { status: true, msg: "Please enter your username"} });
 
    }
    else if (values.pwd.length === 0){
      setErrors({...errors, passwordError: { status: true, msg: "Please enter your password"} });
 
    }
    // same confirmed password
    else if (values.pwd !== values.confirmedPassword) {
        console.log(values.pwd)
        console.log(values.confirmedPassword)
        setErrors({...errors, confirmedPasswordError: { status: true, msg: "Two passwords are inconsistent"} });
    }

    else if (usertype === "instructor" && values.institutionName === "") {
      console.log("institution empty")
      setErrors({...errors, insError: { status: true, msg: "Please choose the institution"} });
  }
    // // empty undergrad school
    // else if (values.undergradSchool.length === 0) {
    //   setErrors({...errors, undergradSchoolError: { status: true, msg: "Please enter a valid Undergraduate School Name"} });
    // }
    // // overall GPA check
    // else if (values.overallGPA < 0 && values.overallGPA > 4) {
    //   setErrors({...errors, overallGPAError: { status: true, msg: "Invalid overall GPA, please change it on a 4.0 scale"} });
    // }
    // // major GPA check
    // else if (values.majorGPA < 0 && values.majorGPA > 4)  {
    //   setErrors({...errors, majorGPAError: { status: true, msg: "Invalid major GPA, please change it on a 4.0 scale"} });
    // }

    // else if (values.toeflScore < 0 && values.toeflScore > 120)  {
    //   setErrors({...errors, toeflScoreError: { status: true, msg: "Invalid TOEFL Score"} });
    // }

    // else if (values.greScore < 0 && values.greScore > 340)  {
    //   setErrors({...errors, greScoreError: { status: true, msg: "Invalid GRE Score"} });
    // }

    else{
      setValues({...values, confirmedPassword: ""})
      delete values.confirmedPassword
      if (usertype === 'student') {
        delete values.institutionName
      }
      let signUpInfo = values
      console.log(JSON.stringify(signUpInfo))
      AccountServices.signup(signUpInfo, usertype)
            .then(response => response.json())
            .then(result=>{
              if (result.status === 1){
                console.log(result.data)
                setErrors({...errors, registerError: { status: "success", msg: "Register success, routing to login page..."} });
                setShowAlert(true)
                // setTimeout(() => {
                //   window.location.href="./";
                // }, 3000);
              }
              else{ // handle fail register conditions
                if (result.code === 1){
                  setErrors({...errors, registerError: { status: "error", msg: "Email already exists. You can directly login."} });
                  setShowAlert(true)                  
                }
                else if (result.code === 2){
                  setErrors({...errors, registerError: { status: "error", msg: "Institution does not exist. Please choose a correct one."} });
                  setShowAlert(true)                  
                }
              }
              //window.location.href="./";
      })
    }
  }

  const handleSubmit1 = (e) => {
    e.preventDefault();
    setErrors(formErrors);
    if (usertype.length === 0) {
      setErrors({...errors, usertypeError: { status: true, msg: "Please select your user type."} });
    } else {
      setShowForm(!showForm);
    }
  }

  localStorage.clear()

  return (
    <div align="center">

    {showAlert? <Collapse in={showAlert}>
                      <Alert
                        severity={errors.registerError.status}
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
                        {errors.registerError.msg}
                      </Alert>
                    </Collapse> : <></>}

      <Paper style={paperStyle} variant="outlined">
        <Avatar style={avatarStyle}><LockIcon/></Avatar>
        <h2>Let's Run</h2>
        {showForm && <Box 

          align="center" 
          component="form" 
          onSubmit={handleSubmit1}
          sx={{'& .MuiTextField-root': { m: 1, width: '40ch' },}} 
          noValidate 
          autoComplete="off">
          <Typography 
            align="center" 
            fontSize="16px"> Already have an account?
            <br></br>
            <Link 
              href='./login' 
              fontSize="18px">
              Click to log in!
            </Link>
          </Typography>  
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

          <Button 
          type="submit" 
          sx={{ m: 1, width: '40ch' }} 
          style={{backgroundColor: "#328059"}} 
          fontSize="25px" 
          variant="contained">
            Next
          </Button>   
              
        </Box>}

        {!showForm && usertype.length && <Box 
          align="center" 
          component="form" 
          onSubmit={handleSubmit}
          sx={{'& .MuiTextField-root': { m: 1, width: '40ch' },}} 
          noValidate 
          autoComplete="off">
            <Typography 
              align="center" 
              fontSize="16px"> Already have an account?
              <br></br>
              <Link 
                href='./login' 
                fontSize="18px">
                Click to log in!
              </Link>
            </Typography>  

            {/* Email Field */}
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
            {/* UsernameField */}
              <TextField 
                required 
                id="username" 
                label="Username"
                onChange={handleUsername}
                value={values.userName}
                error={errors.usernameError.status}
                helperText={errors.usernameError.msg}
                />

              {/* Password Field */}
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

              {/* confirmed Password Field */}
              <TextField 
                required 
                type="password"
                id="confirmedPassword" 
                label="Confirmed Password"
                onChange={handleConfirmedPassword}
                value={values.confirmedPassword}
                error={errors.confirmedPasswordError.status}
                helperText={errors.confirmedPasswordError.msg}
                />
              

             {usertype === "instructor" && <TextField 
              required 
              id="outlined-select-role" 
              select 
              label="Institutions" 
              value={values.institutionName} 
              onChange={handleIns}
              error={errors.insError.status}
              helperText={errors.insError.msg}
              >
                {Object.entries(InsData).map(([key, value])=>
                <MenuItem key={key} value={value.name}>{value.name}</MenuItem>)}
            </TextField>}
                {/*
              Undergraduate School
              <TextField 
                required 
                id="undergradSchool" 
                label="Undergraduate School"
                onChange={handleUndergradSchool}
                value={values.undergradSchool}
                error={errors.undergradSchoolError.status}
                helperText={errors.undergradSchoolError.msg}
                />

              {/* Overall GPA Field 
              <TextField 
                required 
                type = "number"
                id="overallGPA" 
                label="Overall GPA"
                onChange={handleOverallGPA}
                value={values.overallGPA}
                error={errors.overallGPAError.status}
                helperText={errors.overallGPAError.msg}
                />

              {/* Overall GPA Field
                <TextField 
                type = "number"
                id="majorGPA" 
                label="Major GPA"
                onChange={handleMajorGPA}
                value={values.majorGPA}
                error={errors.majorGPAError.status}
                helperText={errors.majorGPAError.msg}
                />

              {/* TOEFL Field 
                <TextField 
                type = "number"
                id="toeflScore" 
                label="TOEFL Score"
                onChange={handleToeflScore}
                value={values.toeflScore}
                error={errors.toeflScoreError.status}
                helperText={errors.toeflScoreError.msg}
                />

              {/* GRE Field 
                <TextField 
                type = "number"
                id="greScore" 
                label="GRE Score"
                onChange={handleGREScore}
                value={values.greScore}
                error={errors.greScoreError.status}
                helperText={errors.greScoreError.msg}
                />

              {/* Research Experience Field
              <TextField 
                id="reserachExperience" 
                label="Research Experience"
                onChange={handleReserachExperience}
                value={values.reserachExperience}
                error={errors.reserachExperience.status}
                helperText={errors.reserachExperience.msg}
                />

              {/* Intership Expereince Field
              <TextField 
                id="intershipExperience" 
                label="Intership Experience"
                onChange={handleIntershipExperience}
                value={values.intershipExperience}
                error={errors.intershipExperience.status}
                helperText={errors.intershipExperience.msg}
                />
                */}

              <Button 
              type="submit" 
              sx={{ m: 1, width: '20ch' }} 
              style={{backgroundColor: "#328059"}} 
              fontSize="25px" 
              variant="contained"
              onClick = { () => {
                setUserType("")
                setShowForm(!showForm);
              }}>

              Last Step
              </Button>    

            {/* Button  */}
              <Button 
              type="submit" 
              sx={{ m: 1, width: '20ch' }} 
              style={{backgroundColor: "black"}} 
              fontSize="25px" 
              variant="contained">
                Register
              </Button>   

       
        </Box>}

      </Paper>
    </div>
  )
}
