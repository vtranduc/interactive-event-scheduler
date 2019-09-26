import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { purple } from "@material-ui/core/colors";

// For color code, go to
// https://material-ui.com/customization/color/

export default function BtnSpecifiedColor({
  text,
  color,
  hoverColor,
  width,
  height,
  onClick
}) {
  const ColorButton = withStyles(theme => ({
    root: {
      width: width ? width : "100px",
      height: height ? height : "36px",
      color: color
        ? theme.palette.getContrastText(color)
        : theme.palette.getContrastText(purple[500]),
      backgroundColor: color ? color : purple[500],
      "&:hover": {
        color: hoverColor
          ? theme.palette.getContrastText(hoverColor)
          : theme.palette.getContrastText(purple[700]),
        backgroundColor: hoverColor ? hoverColor : purple[700]
      },
      "&:disabled": {
        color: hoverColor
          ? theme.palette.getContrastText(hoverColor)
          : theme.palette.getContrastText(purple[700]),
        backgroundColor: hoverColor ? hoverColor : purple[700]
      }
    }
  }))(Button);
  const onClickEvent = onClick ? onClick : () => {};
  return <ColorButton onClick={onClickEvent}>{text}</ColorButton>;
}
