import { yellow } from "@mui/material/colors";
import { theme } from "../../themes/Default";

export const styles = {
  inputs: {
    width: "95%",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  radio: {
    display: "flex"
  },
  coin: {
    background: yellow[700],
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 3px 3px 1px rgba(0,0,0,0.2)",
    color: yellow[100]
  },
  submit: {
    margin: theme.spacing(3, 1, 2),
  },
};
