import React, {useEffect, useMemo} from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { decodeUserInformation } from "../../helpers/helpers";
import * as actionType from "../../constants/actionTypes";
import { styles } from "./styles";

const Navbar = () => {
  const balance = useSelector((state) => state.balance);
  const user = useSelector((state) => state.user);
  const decodedUser = useMemo(() => decodeUserInformation(user), [user]);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useNavigate();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    history("/auth");
  };

  useEffect(() => {
    if (decodedUser?.exp) {
      if (decodedUser.exp * 1000 < new Date().getTime()) logout();
    }
  }, [location]);

  return (
    <AppBar sx={styles.appBar} position="static" color="inherit">
      <div style={styles.brandContainer}>
        <Typography
          component={Link}
          to="/"
          sx={styles.heading}
          variant="h5"
          align="center"
        >
          CoinToss
        </Typography>
      </div>
      <Toolbar sx={styles.toolbar}>
        {decodedUser?.token ? (
          <div style={styles.profile}>
            <div style={styles.profile}>
              <Avatar sx={styles.purple} alt={decodedUser.name} src={decodedUser.picture}>
                {decodedUser.name.charAt(0)}
              </Avatar>
              <Typography sx={styles.userName} variant="h6">
                {decodedUser.name}
              </Typography>
              <Avatar sx={styles.gold}>$</Avatar>
              <Typography sx={styles.tokens} variant="h6">
                Balance: {balance.tokens} tokens
              </Typography>
            </div>
            <Button
              variant="contained"
              sx={styles.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                history("/password");
              }}
            >
              Set Password
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
