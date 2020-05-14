import React from 'react';
import axios from 'axios';
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import clsx from 'clsx';
import theme from "./theme";
import {Switch,Route} from "react-router-dom";
import AppBar from "./AppBar/AppBar";
import Settings from "./Settings";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import Home from "./Home";
import { set_email, set_mail_notifications, set_general_notifications } from './redux_slices/userDataSlice';
import {useDispatch } from 'react-redux';

import './App.css';
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));
function App2(){
  const classes = useStyles();
  const dispatch = useDispatch();
  //Theme color/////////////////////////////////////////////////////////////
  const [DynamicTheme, setTheme] = React.useState(createMuiTheme(theme));
  const [theme_color, set_theme_color] = React.useState("light");
  const [DrawerOpen, setDrawerOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const handleChangeTheme = () => {
    theme.palette.type = theme.palette.type === "light" ? "dark" : "light";
    localStorage.setItem("theme_color", theme.palette.type);
    setTheme(createMuiTheme(theme));
  };
  ///////////////////////////////////////////////////////////////////////////

  ////On start//////////////////////////////////////////////////////////////
  React.useEffect(() => {
    axios("http://localhost/profile", {
      method: "get",
      withCredentials: true
    }).then((resp)=>{
     let user_data=resp.data.data;
     if(user_data!==null){
      dispatch(set_email(user_data.email))
      dispatch(set_general_notifications(user_data.general_notifications))
      dispatch(set_mail_notifications(user_data.mail_notifications))
     }
      console.log(resp)
    }).catch((err)=>{
      if(err.response){
        console.log(err.response)
      }
    })

    let theme_color_local = localStorage.getItem("theme_color");
    if (theme_color_local) {
       set_theme_color(theme_color_local)
    }else{
      localStorage.setItem("theme_color", theme_color);
     }
    if(theme_color_local==="dark"){
      handleChangeTheme()
     }
  }, []);
  ///////////////////////////////////////////////////////////////////////////
  const DrawerProps={
    DrawerOpen:DrawerOpen,
    setDrawerOpen:setDrawerOpen,
    handleDrawerOpen:handleDrawerOpen,
    handleDrawerClose:handleDrawerClose
  }
    return (
    <ThemeProvider theme={DynamicTheme}>
      <CssBaseline />
      <div className={classes.root}>
      <AppBar {...DrawerProps}/>
      <Box my={4} className={clsx(classes.content, {[classes.contentShift]: DrawerOpen})}>

        <Switch>
                 <Route exact path="/">
                   <Home />
                 </Route>
                 <Route path="/login">
                   <LoginForm/>
                 </Route>
                 <Route path="/signup">
                   <SignUpForm/>
                 </Route>
                 <Route path="/settings">
                   <Settings handleChangeTheme={handleChangeTheme} />
                 </Route>
        </Switch>
        </Box>
      </div>
       </ThemeProvider>
    )
}
export default App2;
