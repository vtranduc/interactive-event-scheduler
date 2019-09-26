// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Avatar from "@material-ui/core/Avatar";
// import Grid from "@material-ui/core/Grid";

// const useStyles = makeStyles({
//   avatar: {
//     margin: 10
//   },
//   bigAvatar: {
//     margin: 10,
//     width: 60,
//     height: 60
//   }
// });

// export default function Test() {
//   const classes = useStyles();

//   return (
//     <Grid
//       container
//       justify="center"
//       alignItems="center"
//       // style={{ backgroundColor: "white" }}
//     >
//       <Avatar
//         // style={{ opacity: 1 }}
//         alt="Remy Sharp"
//         src="https://66.media.tumblr.com/8777395fcf9833f0c67be1b29a1dff19/tumblr_pegs5ypAHb1wjwbano5_250.png"
//         className={classes.avatar}
//       />
//       <Avatar
//         alt="Remy Sharp"
//         src="https://cdn.imgbin.com/4/19/11/imgbin-nico-yazawa-love-live-school-idol-festival-manga-japanese-idol-anime-manga-nJJpPbMig8DCzgHUENGGDkhMp.jpg"
//         className={classes.bigAvatar}
//       />
//     </Grid>
//   );
// }

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  avatar: {
    margin: 0
  }
});

export default function Test({ avatarPath }) {
  const classes = useStyles();

  return (
    <Grid container justify="center" alignItems="center">
      <Avatar alt={avatarPath} src={avatarPath} className={classes.avatar} />
    </Grid>
  );
}
