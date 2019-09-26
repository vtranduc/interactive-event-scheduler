// For button colors, refer to the following:
// https://material-ui.com/customization/color/

import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { purple } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";

export default function FullWidthBtnGroup({
  btns,
  color,
  hoverColor,
  selectedkey
}) {
  const ColorButton = withStyles(theme => ({
    root: {
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
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <ButtonGroup fullWidth variant="contained" color="primary" size="large">
          {btns.map(e => {
            return (
              <ColorButton
                key={e.key}
                onClick={e.onClick}
                variant="contained"
                color="primary"
                disabled={selectedkey === e.key}
                disableRipple={true}
              >
                {e.text}
              </ColorButton>
            );
          })}
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}
