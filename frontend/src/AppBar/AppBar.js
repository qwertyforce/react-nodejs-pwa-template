import React from "react";
import clsx from 'clsx';
import { fade, makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import Typography from "@material-ui/core/Typography";
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AppDrawer from "./Drawer";
import { useSelector} from 'react-redux';
import {selectMailNotifications,selectGeneralNotifications} from '../redux_slices/userDataSlice';
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
  const GeneralNotifications = useSelector(selectGeneralNotifications);
  const MailNotifications = useSelector(selectMailNotifications);
  return (
    <div>
      <AppBar 
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: props.DrawerOpen,
        })}>
        <Toolbar className={classes.customizeToolbar}>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerOpen}
            edge="start"
            className={clsx(props.DrawerOpen && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            App
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              onChange={e => props.handleInputOnChange(e)}
              inputProps={{ "aria-label": "search" }}
            />
          </div>

          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open settings"
            onClick={props.handleMenuClick}
          >
          <Badge badgeContent={MailNotifications} color="secondary">
            <MailIcon />
          </Badge>
          </IconButton>

           <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open settings"
            onClick={props.handleMenuClick}
          >
           <Badge badgeContent={GeneralNotifications} color="secondary">
            <NotificationsIcon />
          </Badge>
          </IconButton>

          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open settings"
            onClick={props.handleMenuClick}
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <AppDrawer open={props.DrawerOpen} handleDrawerClose={props.handleDrawerClose}/>
      </div>
  );
}

export default App_Bar;