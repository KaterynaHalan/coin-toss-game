import React, { useEffect } from "react";
import {AppBar, Typography} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getTosses } from "../../actions/toss";
import { styles } from "./styles";
import Coin from "../Coin/Coin";

const History = () => {
    const user = useSelector((state) => state.user);
    const history = useSelector((state) => state.history);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user.token) dispatch(getTosses());
    }, [user.token]);

    return user.token && history.tosses.length > 0 ? (
        <AppBar sx={styles.appBar} position="static" color="inherit">
            <Typography sx={styles.heading} variant="h5" color="primary" align="center" pb={1} mb={2}>
                Your last tosses:
            </Typography>

            <div style={styles.tosses}>
                {
                    history.tosses.map(({ type, won, wager }, index) => (
                        <div key={index} style={styles.toss}>
                            <Coin type={type} />
                            <Typography variant="body2" align="center" mt={1}>
                                Wager: {wager}
                            </Typography>
                            <Typography variant="body2" align="center">
                                Won: {won}
                            </Typography>
                        </div>
                    ))
                }
            </div>
        </AppBar>
    ) : null;
};

export default History;
