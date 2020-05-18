import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail'
import SettingsApplicationsOutlinedIcon from '@material-ui/icons/SettingsApplicationsOutlined';
import Drawer from '@material-ui/core/Drawer';
import theme from "./../theme";
import {Link} from "react-router-dom";
const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));



function AppDrawer (props) {
  const classes = useStyles();
  return (
    <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={props.open}
        classes={{
          drawerPaper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <h1>Sample Text</h1>
          <IconButton onClick={props.handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
        <ListItem button component={Link} to="/push_notifications"  >
          <ListItemIcon><InboxIcon /></ListItemIcon>
          <ListItemText>Push Notifications</ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/dashboard"  >
          <ListItemIcon><MailIcon /></ListItemIcon>
          <ListItemText>Text 2</ListItemText>
        </ListItem>
        </List>
        <Divider />
        <List>
        <ListItem button component={Link} to="/dashboard"  >
          <ListItemIcon><MailIcon/></ListItemIcon>
          <ListItemText>Text 3</ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/dashboard"  >
          <ListItemIcon><MailIcon /></ListItemIcon>
          <ListItemText>Text 4</ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/settings"  >
          <ListItemIcon><SettingsApplicationsOutlinedIcon/></ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </ListItem>
        </List>
      </Drawer>
  );
}
export default AppDrawer;
