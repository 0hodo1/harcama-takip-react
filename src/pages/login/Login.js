import "./Login.module.css";

import {
  Container,
  Typography,
  Button,
  FormControl,
  FilledInput,
  InputLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const navigate = useNavigate();
  const { login, error, waiting } = useLogin();
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(values.email, values.password);
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
          Login
        </Typography>
        <FormControl fullWidth sx={{ mt: 5 }}>
          <InputLabel htmlFor="email">Email</InputLabel>
          <FilledInput
            id="email"
            label="email"
            values={values.email}
            onChange={handleChange("email")}
          />
        </FormControl>
        <FormControl fullWidth sx={{ my: 5 }}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <FilledInput
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
        {waiting && (
          <Button
            variant="outlined"
            type="submit"
            color="info"
            size="large"
            sx={{ mt: 5 }}
            disabled
          >
            Waiting
          </Button>
        )}
        {!waiting && (
          <Button
            variant="outlined"
            type="submit"
            color="info"
            size="large"
            sx={{ mt: 5 }}
          >
            Login
          </Button>
        )}
        {error && <p>{error}</p>}
      </form>
    </Container>
  );
};
export default Login;
