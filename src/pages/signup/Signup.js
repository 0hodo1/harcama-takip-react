import "./Signup.module.css";
import { useSignup } from "../../hooks/useSignup";

import {
  Container,
  Typography,
  Button,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
  const navigate = useNavigate();
  const { error, waiting, signup } = useSignup();
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
    username: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(values.email, values.password, values.username);
    navigate("/");
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Typography
          sx={{ mt: 15, ml: 5, fontWeight: "bold" }}
          variant="h4"
          color="darkslateblue"
        >
          Signup
        </Typography>
        <FormControl fullWidth sx={{ mt: 5 }}>
          <InputLabel htmlFor="email">Email</InputLabel>
          <OutlinedInput
            id="email"
            label="email"
            values={values.email}
            onChange={handleChange("email")}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 5 }}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            type={values.showPassword ? "text" : "password"}
            id="password"
            label="password"
            values={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle Password"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl fullWidth sx={{ my: 5 }}>
          <InputLabel htmlFor="username">User Name</InputLabel>
          <OutlinedInput
            id="username"
            label="User Name"
            values={values.username}
            onChange={handleChange("username")}
          />
        </FormControl>
        {!waiting && (
          <Button
            variant="contained"
            type="submit"
            color="info"
            size="large"
            sx={{ mt: 5 }}
          >
            Signup
          </Button>
        )}
        {waiting && (
          <Button
            variant="contained"
            type="submit"
            color="info"
            size="large"
            sx={{ mt: 5 }}
            disabled
          >
            Bekleyiniz...
          </Button>
        )}
        {error && <p>{error}</p>}
      </form>
    </Container>
  );
};
export default Signup;
