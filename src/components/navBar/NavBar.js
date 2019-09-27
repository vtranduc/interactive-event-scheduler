import React, { useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
// import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Cookies from "universal-cookie";
import useKeyPress from "../../helpers/useKeyPress";
import "./NavBar.css";
import endSpaceRemover from "../../helpers/endSpaceRemover";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up(460)]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  }
}));

export default function NavBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  // const [searchStrNav, setSearchStrNav] = React.useState("");
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  //====MY ALGORITHM HERE=======================
  // useEffect(() => {
  //   console.log("show my path please: ", props.location.pathname);
  //   if (props.location.pathname === props.routeDirector) {
  //     console.log("time to stop");
  //     //THIS IS A GOOD TIME TO CHECK FOR COOKIE!!!!!
  //     props.setRouteDirector(null);
  //   }
  // }, [props.location.pathname]);
  //============================================

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogOut = () => {
    handleMenuClose();
    const cookies = new Cookies();
    cookies.remove("user");
    props.setProfile(null);
    props.setRouteDirector("/login");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem
        onClick={() => {
          props.setRouteDirector("/");
          handleMenuClose();
        }}
      >
        Home
      </MenuItem> */}
      <MenuItem
        onClick={() => {
          // handleRouteDirection("/profile");
          props.setRouteDirector(`/user/${props.profile.id}`);
          handleMenuClose();
        }}
      >
        Profile
      </MenuItem>

      <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {props.profile ? (
        <div>
          {/* <MenuItem
            onClick={() => {
              props.setRouteDirector("/");
              handleMenuClose();
            }}
          >
            Home
          </MenuItem> */}
          <MenuItem>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <p>Messages</p>
          </MenuItem>
          <MenuItem>
            <IconButton aria-label="show 11 new notifications" color="inherit">
              <Badge badgeContent={11} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <p>Notifications</p>
          </MenuItem>
          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <div className="avatarWrapperShrunk">
                <img
                  src={props.profile.avatar}
                  alt={props.profile.avatar}
                ></img>
              </div>
            </IconButton>
            <p>Profile</p>
          </MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem
            onClick={() => {
              props.setRouteDirector("/login");
            }}
          >
            <AccountCircle />
            <p>Log In</p>
          </MenuItem>
          <MenuItem
            onClick={() => {
              props.setRouteDirector("/signup");
            }}
          >
            <AccountCircle />
            <p>Sign Up</p>
          </MenuItem>
        </div>
      )}
    </Menu>
  );

  const Enter = useKeyPress("Enter");
  useEffect(() => {
    if (
      Enter &&
      document.activeElement === document.getElementById("searchInputField")
    ) {
      // console.log("hatsune miku here", searchStr);
      // props.socket.emit("searchEvent", { search: endSpaceRemover(searchStr) });
      //   if (
      //     document.activeElement === document.getElementById("emailLogin") ||
      //     document.activeElement === document.getElementById("passwordLogin")
      //   ) {
      //     handleSubmission(loginInfo, setLoginInfo, socket);
      //   } else {
      //     document.getElementById("emailLogin").focus();
      //   }
    }
  }, [Enter]);

  // useEffect(() => {
  //   console.log("setting home val");
  //   props.setSearchStr(searchStrNav);
  // }, [searchStrNav]);

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton> */}
          <div className={classes.menuButton}>
            <img
              onClick={() => {
                // console.log("test");
                props.setRouteDirector("/");
              }}
              style={{ height: "42px", cursor: "pointer" }}
              src={props.logo}
            ></img>
          </div>
          {/* <div>
            <img src={"../../logo.png"}></img>
          </div> */}
          <Typography
            onClick={() => {
              props.setRouteDirector("/");
            }}
            className={classes.title}
            style={{ cursor: "pointer" }}
            variant="h6"
            noWrap
          >
            Event scheduler
          </Typography>
          {/* ======== UNCOMMENT THIS PART FOR NICE SEARCHBAR!!!!========== */}
          {/* <TextField
            id="outlined-name"
            label="Name"
            // className={classes.textField}
            // value={values.name}
            // onChange={handleChange("name")}
            margin="normal"
            variant="outlined"
          /> */}

          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon
              // onClick={() => {
              //   console.log("make some noise!");
              // }}
              />
            </div>

            <InputBase
              // id="searchInputField"

              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={e => {
                // setTest(e.target.value);
                setSearchStrNav(e.target.value);
                // props.setSearchStr(e.target.value);
              }}
              // value={test}
              value={searchStrNav}
              // value="you are my friend"
            />

          </div> */}
          {/* ======== FIN======================================================= */}
          <div className={classes.grow} />
          {/* ================================================== */}
          {/* ================================================== */}
          {/* ================================================== */}
          {props.profile ? (
            <div className={classes.sectionDesktop}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <div className="avatarWrapper">
                  <img
                    src={props.profile.avatar}
                    alt={props.profile.avatar}
                  ></img>
                </div>
                {/* {props.profile.avatar ? (
                  <div className="avatarWrapper">
                    <img
                      src={props.profile.avatar}
                      alt={props.profile.avatar}
                    ></img>
                  </div>
                ) : (
                  <AccountCircle />
                )} */}
              </IconButton>
              <List className="listOfBtns">
                <ListItem
                  className="navBarBtnItems"
                  button
                  onClick={() => {
                    props.setRouteDirector("/");
                  }}
                >
                  Home
                </ListItem>
                <ListItem
                  className="navBarBtnItems"
                  button
                  onClick={() => {
                    props.setRouteDirector(`/user/${props.profile.id}`);
                  }}
                >
                  {props.profile.firstName}
                </ListItem>
              </List>
              {/* Icon buttons HERE========================================= */}
              {/* <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton> */}
              {/* ============================================================== */}
            </div>
          ) : (
            <div className={classes.sectionDesktop}>
              <List className="listOfBtns">
                <ListItem
                  className="navBarBtnItems"
                  button
                  onClick={() => {
                    props.setRouteDirector("/login");
                  }}
                >
                  Log In
                </ListItem>
                <ListItem
                  className="navBarBtnItems"
                  button
                  onClick={() => {
                    props.setRouteDirector("/signup");
                  }}
                >
                  Sign Up
                </ListItem>
              </List>
            </div>
          )}

          {/* ================================================== */}
          {/* ================================================== */}
          {/* ================================================== */}
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
