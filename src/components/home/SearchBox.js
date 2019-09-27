import React, { useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import useKeyPress from "../../helpers/useKeyPress";
import BtnSpecifiedColor from "../btnSpecifiedColor/BtnSpecifiedColor";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none"
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
    width: "100%"
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
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%"
  }
}));

export default function SearchBox({ searchStr, setSearchStr, onSearch }) {
  const classes = useStyles();
  const [searchFocussed, setSearchFocussed] = React.useState(false);

  const Enter = useKeyPress("Enter");
  useEffect(() => {
    if (Enter && searchFocussed) {
      onSearch();
    }
  }, [Enter]);

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              style={{ width: "100%" }}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              placeholder="Search an event..."
              inputProps={{ "aria-label": "search" }}
              onChange={e => {
                setSearchStr(e.target.value);
              }}
              value={searchStr}
              onFocus={() => {
                setSearchFocussed(true);
              }}
              onBlur={() => {
                setSearchFocussed(false);
              }}
            />
          </div>
          <BtnSpecifiedColor
            onClick={onSearch}
            text="Search"
            color="#303F9F"
            hoverColor="#1A237E"
            width={"100px"}
            height={"38px"}
          ></BtnSpecifiedColor>
        </Toolbar>
      </AppBar>
    </div>
  );
}
