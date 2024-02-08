import React, { useCallback, useState } from "react";
import {
    Button, FormControl, FormLabel, Grid,
    FormControlLabel, Radio, RadioGroup, TextField
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import GestureIcon from '@mui/icons-material/Gesture';
import { createToss } from "../../actions/toss";
import { COIN_TYPE } from "../../constants/constants";
import { styles } from "./styles";

const Game = () => {
    const dispatch = useDispatch();
    const balance = useSelector((state) => state.balance);

    const [wager, setWager] = useState(0);
    const [coinType, setCoinType] = useState(COIN_TYPE.Heads);
    const [loading, setLoading] = useState(false);

    const handleChangeWager = useCallback((e) => {
        if (e.target.value > 0 && e.target.value <= balance.tokens) {
            setWager(e.target.value);
        }
    }, [balance.tokens]);

    const handleChangeCoin = useCallback((e) => {
        setCoinType(Number(e.target.value));
    }, []);

    const handleSubmitChange = (e) => {
        e.preventDefault();
        setLoading(true);
        dispatch(createToss({ type: +coinType, wager: +wager }))
            .then(() => setLoading(false));
    };

    return (
        <form onSubmit={handleSubmitChange}>
            <Grid container spacing={2}>
                <div style={styles.inputs}>
                    <FormControl style={styles.radio}>
                        <FormLabel>Choose the coin side</FormLabel>
                        <RadioGroup
                            row
                            name="row-radio-buttons-group"
                            onChange={handleChangeCoin}
                            value={coinType}
                        >
                            {
                                Object.entries(COIN_TYPE).map(([name, type]) => (
                                    <FormControlLabel key={name} value={type} control={<Radio />} label={name} />
                                ))
                            }
                        </RadioGroup>
                    </FormControl>

                    <div style={styles.coin}>
                        {coinType === COIN_TYPE.Heads ? <PsychologyAltIcon /> : <GestureIcon />}
                    </div>

                    <TextField
                        name="wager"
                        onChange={handleChangeWager}
                        variant="outlined"
                        required
                        label="Enter your wager"
                        autoFocus={true}
                        type="number"
                        size="small"
                        value={wager}
                    />
                </div>
                <Button
                    type="submit"
                    sx={styles.submit}
                    fullWidth
                    disabled={wager === 0 || loading}
                    variant="contained"
                    color="primary"
                >
                    Toss
                </Button>
            </Grid>
        </form>
    );
};

export default Game;
