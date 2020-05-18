import React from "react";
import InvertColorsIcon from "@material-ui/icons/InvertColors";
import Button from "@material-ui/core/Button";

function Settings(props) {
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
