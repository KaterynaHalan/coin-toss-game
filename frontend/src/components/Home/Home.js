import React, { useMemo } from "react";
import { Button, Container, Grow, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { decodeUserInformation } from "../../helpers/helpers";
import { buyTokens } from "../../actions/balance";
import Game from "../Game/Game";
import { styles } from "./styles";

const Home = () => {
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.balance);
  const user = useSelector((state) => state.user);
  const decodedUser = useMemo(() => decodeUserInformation(user), [user]);

  return (
    <Grow in>
      <Container component="main" maxWidth="sm">
        <Paper sx={styles.paper} elevation={3}>
            {decodedUser?.token ? (
                <>
                  <Typography variant="h4" align="center" color="primary">
                    {`Welcome ${decodedUser.name}`}
                  </Typography>
                  {
                    balance.tokens > 0 ? (
                        <>
                          <Typography variant="h5" mb={5}>
                            Let's play the game!
                          </Typography>
                          <Game />
                        </>
                    ) : (
                        <>
                          <Typography variant="h6" mt={5} align="center" mb={2}>
                            Looks like you do not have enough tokens to play :(
                          </Typography>
                          <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => dispatch(buyTokens())}
                          >
                            Buy Tokens
                          </Button>
                        </>
                    )
                  }
                </>
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
