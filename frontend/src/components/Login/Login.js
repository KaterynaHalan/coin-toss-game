import React, {useEffect, useMemo, useState} from "react";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import Input from "./Input";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup, login } from "../../actions/login";
import { decodeUserInformation } from "../../helpers/helpers";
import LockIcon from "@mui/icons-material/LockOutlined";
import { styles } from "./styles";

const formDataInitVal = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Login = () => {
  const [formData, setFormData] = useState(formDataInitVal);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const user = useSelector((state) => state.user);
  const decodedUser = useMemo(() => decodeUserInformation(user), [user]);

  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    if (decodedUser?.token) history("/");
  }, [decodedUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      dispatch(login(formData, history));
    } else {
      dispatch(signup(formData, history));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = (e) => {
    setShowPassword((prevPassword) => !prevPassword);
  };

  const switchLogin = (e) => {
    setIsLoggedIn((prevState) => !prevState);
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Paper sx={styles.paper} elevation={3}>
          <Avatar sx={styles.avatar}>
            {" "}
            <LockIcon />
          </Avatar>
          <Typography variant="h5" color="primary">
            {isLoggedIn ? "Login" : "Logout"}
          </Typography>
          <form sx={styles.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {!isLoggedIn && (
                  <>
                    <Input
                        name="firstName"
                        label="First Name"
                        handleChange={handleChange}
                        autoFocus
                        half
                    />
                    <Input
                        name="lastName"
                        label="Last Name"
                        handleChange={handleChange}
                        half
                    />
                  </>
              )}

              <Input
                  name="email"
                  label="Email Address"
                  handleChange={handleChange}
                  type="email"
              />
              <Input
                  name="password"
                  label="Password"
                  handleChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  handleShowPassword={handleShowPassword}
                  half={!isLoggedIn}
                  showBar={!isLoggedIn}
                  passValue={formData.password}
              />
              {!isLoggedIn && (
                  <>
                    <Input
                        name="confirmPassword"
                        label="Confirm Password"
                        handleChange={handleChange}
                        type="password"
                        half
                    />
                  </>
              )}
            </Grid>
            <Button
                type="submit"
                sx={styles.submit}
                fullWidth
                variant="contained"
                color="primary"
            >
              {isLoggedIn ? "Login" : "Sign Up"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={switchLogin}>
                  {isLoggedIn
                      ? "Don't Have An Account? Sign Up."
                      : "Already Have An Account? Login."}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
