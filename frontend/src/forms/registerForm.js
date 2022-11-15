import React from "react";
import {
  Typography,
  Link,
  Box,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";

const registerForm1 = (props) => {
  return (
    <Box
      align="center"
      component="form"
      onSubmit={props.functions.handleNextForm}
      sx={{ "& .MuiTextField-root": { m: 1, width: "40ch" } }}
      noValidate
      autoComplete="off"
    >
      <Typography align="center" fontSize="16px">
        {" "}
        Already have an account?
        <br></br>
        <Link href="./login" fontSize="18px">
          Click to log in!
        </Link>
      </Typography>
      <TextField
        required
        id="outlined-select-role"
        select
        label="Login As"
        value={props.values.usertype}
        onChange={props.functions.handleUserType}
        error={props.values.errors.usertypeError.status}
        helperText={props.values.errors.usertypeError.msg}
      >
        <MenuItem value={"student"}>Student</MenuItem>
        <MenuItem value={"instructor"}>Instructor</MenuItem>
      </TextField>

      <Button
        type="submit"
        sx={{ m: 1, width: "40ch" }}
        style={{ backgroundColor: "#328059" }}
        fontSize="25px"
        variant="contained"
      >
        Next
      </Button>
    </Box>
  );
};

const registerForm2 = (props) => {
  return (
    <Box
      align="center"
      component="form"
      onSubmit={props.functions.handleSubmit}
      sx={{ "& .MuiTextField-root": { m: 1, width: "40ch" } }}
      noValidate
      autoComplete="off"
    >
      <Typography align="center" fontSize="16px">
        {" "}
        Already have an account?
        <br></br>
        <Link href="./login" fontSize="18px">
          Click to log in!
        </Link>
      </Typography>

      {/* Email Field */}
      <TextField
        required
        type="email"
        id="email"
        label="Email"
        onChange={props.functions.handleEmail}
        value={props.values.registerValues.email}
        error={props.values.errors.emailError.status}
        helperText={props.values.errors.emailError.msg}
      />
      {/* UsernameField */}
      <TextField
        required
        id="username"
        label="Username"
        onChange={props.functions.handleUsername}
        value={props.values.registerValues.userName}
        error={props.values.errors.usernameError.status}
        helperText={props.values.errors.usernameError.msg}
      />

      {/* Password Field */}
      <TextField
        required
        type="password"
        id="password"
        label="Password"
        onChange={props.functions.handlePassword}
        value={props.values.registerValues.pwd}
        error={props.values.errors.passwordError.status}
        helperText={props.values.errors.passwordError.msg}
      />

      {/* confirmed Password Field */}
      <TextField
        required
        type="password"
        id="confirmedPassword"
        label="Confirmed Password"
        onChange={props.functions.handleConfirmedPassword}
        value={props.values.registerValues.confirmedPassword}
        error={props.values.errors.confirmedPasswordError.status}
        helperText={props.values.errors.confirmedPasswordError.msg}
      />

      {props.values.usertype === "instructor" && (
        <TextField
          required
          id="outlined-select-role"
          select
          label="Institutions"
          value={props.values.registerValues.institutionName}
          onChange={props.functions.handleIns}
          error={props.values.errors.insError.status}
          helperText={props.values.errors.insError.msg}
        >
          {Object.entries(props.values.InsData).map(([key, value]) => (
            <MenuItem key={key} value={value.name}>
              {value.name}
            </MenuItem>
          ))}
        </TextField>
      )}

      <Button
        type="submit"
        sx={{ m: 1, width: "20ch" }}
        style={{ backgroundColor: "pink", opacity:0.8 }}
        fontSize="25px"
        variant="contained"
        onClick={() => {
          props.functions.setUserType("");
          props.functions.setShowForm(!props.values.showForm);
        }}
      >
        Go back
      </Button>

      {/* Button  */}
      <Button
        type="submit"
        sx={{ m: 1, width: "20ch" }}
        style={{ backgroundColor: "#328059" }}
        fontSize="25px"
        variant="contained"
      >
        Register
      </Button>
    </Box>
  );
};

const registerForm = {
  registerForm1,
  registerForm2,
};

export default registerForm;
