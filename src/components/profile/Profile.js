import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { purple } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import "./Profile.css";

// const ColorButton = withStyles(theme => ({
//   root: {
//     color: theme.palette.getContrastText(purple[500]),
//     backgroundColor: purple[500],
//     "&:hover": {
//       backgroundColor: purple[700]
//     },
//     "&:disabled": {
//       backgroundColor: purple[900],
//       color: theme.palette.getContrastText(purple[900])
//     }
//   }
// }))(Button);

export default function Profile({ profile }) {
  return (
    <Paper className="paper">
      <div className="paperFiller">
        <div className="paperLeft"></div>
        <div className="paperRight"></div>
      </div>
    </Paper>
  );
}
