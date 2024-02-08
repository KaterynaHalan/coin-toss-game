import React from "react";
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import GestureIcon from '@mui/icons-material/Gesture';
import { COIN_TYPE } from "../../constants/constants";
import { styles } from "./styles";

const Coin = ({ type }) => {
    return (
        <div style={styles.coin}>
            {type === COIN_TYPE.Heads ? <PsychologyAltIcon/> : <GestureIcon/>}
        </div>
    );
};

export default Coin;
