import React, {useMemo} from "react";
import { Container, Grow, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { decodeUserInformation } from "../../helpers/helpers";

const Home = () => {
  const user = useSelector((state) => state.user);
  const decodedUser = useMemo(() => decodeUserInformation(user), [user]);

  return (
    <Grow in>
      <Container component="main" maxWidth="sm">
        <Paper elevation={3}>
          {decodedUser?.token ? (
            <Typography variant="h4" align="center" color="primary">
              {`Welcome ${decodedUser.name}`}
            </Typography>
          ) : (
            <Typography variant="h4" align="center" color="primary">
              Login to Play
            </Typography>
          )}
        </Paper>
      </Container>
    </Grow>
  );
};

export default Home;
