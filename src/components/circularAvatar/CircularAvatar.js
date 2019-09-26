import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

export default function CircularAvatar({ avatarPath, diameter }) {
  const useStyles = makeStyles({
    avatar: diameter
      ? {
          margin: 0,
          height: diameter,
          width: diameter
        }
      : {
          margin: 0
        }
  });
  const classes = useStyles();

  return (
    <Grid container justify="center" alignItems="center">
      <Avatar alt={avatarPath} src={avatarPath} className={classes.avatar} />
    </Grid>
  );
}
