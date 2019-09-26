// import React from "react";
// import Grid from "@material-ui/core/Grid";
// import Button from "@material-ui/core/Button";
// import ButtonGroup from "@material-ui/core/ButtonGroup";
// import { purple } from "@material-ui/core/colors";
// import { withStyles } from "@material-ui/core/styles";
// import "./Profile.css";

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

// export default function GroupedButtons() {
//   return (
//     <Grid container spacing={3} style={{ border: "solid 50px" }}>
//       <Grid item xs={12}>
//         <ColorButton
//           variant="contained"
//           color="primary"
//           disabled
//           // classes={{ disabled: classes.disabledButton }}
//           // className="Button"
//         >
//           Custom CSS
//         </ColorButton>
//         <ButtonGroup fullWidth variant="contained" color="primary" size="large">
//           <ColorButton
//             variant="contained"
//             color="primary"
//             disabled
//             // classes={{ disabled: classes.disabledButton }}
//             // className="Button"
//           >
//             Custom CSS
//           </ColorButton>
//           <ColorButton variant="contained" color="primary">
//             Custom CSS
//           </ColorButton>
//           <ColorButton variant="contained" color="primary">
//             Custom CSS
//           </ColorButton>
//         </ButtonGroup>
//       </Grid>
//     </Grid>
//   );
// }
