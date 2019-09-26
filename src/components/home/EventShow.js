import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
// import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "./EventShow.css";
import CircularAvatar from "../circularAvatar/CircularAvatar";
import BtnSpecifiedColor from "../btnSpecifiedColor/BtnSpecifiedColor";
// import EventDetailsShow from "./EventDetailsShow";
import CustomizedPopover from "./customizedPopover";

const btnHeight = "36px";
const btnWidth = "100px";

export default function EventShow({ event, id, socket, marginTop }) {
  const useStyles = makeStyles(theme => ({
    card: {
      // maxWidth: 345
      marginTop: marginTop ? marginTop : "auto"
    },
    media: {
      height: 0,
      paddingTop: "56.25%" // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: "rotate(180deg)"
    },
    avatar: {
      backgroundColor: red[500]
    }
  }));

  const classes = useStyles();
  // const classesButton = useStylesButton();
  const [expanded, setExpanded] = React.useState(false);
  // const [editMode, setEditMode] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={`${classes.card} eventPaper`}>
      <CardHeader
        avatar={
          // <Avatar aria-label="recipe" className={classes.avatar}>
          //   R
          // </Avatar>
          <CircularAvatar
            avatarPath={event.creator.avatar}
            diameter={"60px"}
            // style={{ border: "solid 10px" }}
          ></CircularAvatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          event.location ? `${event.name} at ${event.location}` : event.name
        }
        subheader={`${event.start} until ${event.end}\nfdsa`}
      />
      <CardMedia
        className={classes.media}
        image={event.picture}
        title={event.name}
      />
      {/* <CardContent className="joinedAvatar"> */}
      <div className="goersTitle">
        <Typography variant="body2" color="textSecondary" component="p">
          These people are going!
        </Typography>
      </div>
      <div className="joinedAvatar">
        {/* <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography> */}

        {event.participants.map(e => (
          <div className="joinedAvatarWrapper" key={e.user_id}>
            <CircularAvatar
              avatarPath={e.avatar}
              diameter={"60px"}
            ></CircularAvatar>
          </div>
        ))}
      </div>
      {/* </CardContent> */}
      <CardActions disableSpacing>
        {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        <div className="eventBtnWrapper">
          {event.participants.map(e => e.user_id).includes(id) ? (
            <div className="individualEventBtnWrapper">
              <BtnSpecifiedColor
                text="Leave"
                onClick={() => {
                  socket.emit("leaveEvent", {
                    event_id: event.id,
                    user_id: id
                  });
                }}
                color="#f44336"
                hoverColor="#b71c1c"
                width={btnWidth}
                height={btnHeight}
              ></BtnSpecifiedColor>
            </div>
          ) : (
            <div className="individualEventBtnWrapper">
              <BtnSpecifiedColor
                text="Join"
                onClick={() => {
                  socket.emit("joinEvent", {
                    event_id: event.id,
                    user_id: id
                  });
                }}
                color="#69f0ae"
                hoverColor="#00c853"
                width={btnWidth}
                height={btnHeight}
              ></BtnSpecifiedColor>
            </div>
          )}
          {event.admin && (
            <div className="individualEventBtnWrapper">
              <CustomizedPopover
                btnText="Edit"
                btnColor="#ffeb3b"
                btnHoverColor="#fbc02d"
                btnWidth={btnWidth}
                btnHeight={btnHeight}
                socket={socket}
                eventId={event.id}
              ></CustomizedPopover>
            </div>
          )}
        </div>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          // style={{ border: "solid green" }}
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      {/* ===== EXPANDABLE ============================================== */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <h1>ok let us put this for now</h1>
          {/* <EventDetailsShow></EventDetailsShow> */}
          {/* <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
            over medium-high heat. Add chicken, shrimp and chorizo, and cook,
            stirring occasionally until lightly browned, 6 to 8 minutes.
            Transfer shrimp to a large plate and set aside, leaving chicken and
            chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
            onion, salt and pepper, and cook, stirring often until thickened and
            fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
            cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
            shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender,
            5 to 7 minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then
            serve.
          </Typography> */}
        </CardContent>
      </Collapse>
      {/* ========================================================== */}
    </Card>
  );
}

// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
// import Typography from "@material-ui/core/Typography";
// import "./EventShow.css";

// const useStylesPaper = makeStyles(theme => ({
//   root: {
//     padding: theme.spacing(3, 2)
//   }
// }));

// export default function EventShow({ event }) {
//   const classesPaper = useStylesPaper();

//   return (
//     <div>
//       <Paper className={`${classesPaper.root} eventPaper`}>
//         <Typography variant="h5" component="h3">
//           {event.name}
//         </Typography>
//         <Typography component="p">
//           Paper can be used to build surface or other elements for your
//           application.
//         </Typography>
//       </Paper>
//     </div>
//   );
// }

// {
//   id: e.event_id,
//   name: e.name,
//   picture: e.picture,
//   description: e.description,
//   location: e.location,
//   start: e.start_time,
//   end: e.end_time,
//   createdDate: e.created_time,
//   joinedData: e.joined_time,
//   admin: e.admin,
//   participants: e.participants,
//   creator: {
//     id: e.creator_id,
//     firstName: e.first_name,
//     lastName: e.last_name,
//     avatar: e.avatar ? e.avatar : avatarDefault,
//     background: e.background ? e.background : backgroundDefault,
//     bio: e.bio
//   }
