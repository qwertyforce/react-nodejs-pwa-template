import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { useSelector} from 'react-redux';
import {selectEmail} from './redux_slices/userDataSlice';
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  customizeToolbar: {
    "min-height": 56
  },
  title: {
    flexGrow: 1,
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
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
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
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  },
  menuButton: {
    marginLeft: theme.spacing(2)
  },
  hide: {
    display: 'none',
  },
}));

  

function App_Bar (props) {
  const classes = useStyles();
  const Email = useSelector(selectEmail);
  return (
    <div>
     <h2>{(Email===null)?<p>please,<a href="/login">log in</a></p>:`Welcome,${Email}`}</h2>
    </div>
  );
}

export default App_Bar;