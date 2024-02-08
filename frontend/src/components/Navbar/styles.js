import { theme } from "../../themes/Default";

import { deepPurple, yellow } from "@mui/material/colors";

export const styles = {
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 50px",
  },
  heading: {
    color: "rgba(0,183,255, 1)",
    textDecoration: "none",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "1000px",
  },
  profile: {
    display: "flex",
    alignItems: "center"
  },
  logout: {
    marginRight: "10px",
  },
  userName: {
    display: "flex",
    alignItems: "center",
    margin: "0 10px"
  },
  balance: {
    display: "flex",
    alignItems: "center",
    margin: "0 10px"
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  gold: {
    color: "white",
    backgroundColor: yellow[800],
  },
};
