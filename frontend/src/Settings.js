import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import InvertColorsIcon from "@material-ui/icons/InvertColors";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({


}));

function Settings(props) {
  const classes = useStyles();
  return (
    <div>
    <h1>Sample Text</h1>
    <Button variant = "contained" onClick = {props.handleChangeTheme} startIcon = {<InvertColorsIcon/>}>
    Change theme
    </Button>
    </div>
  )

}
export default Settings;
