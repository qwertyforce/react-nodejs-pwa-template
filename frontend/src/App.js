import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { fade, makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import clsx from 'clsx';
import theme from "./theme";
import {Switch,Route,Link} from "react-router-dom";
import AppBar from "./AppBar/AppBar";
import Settings from "./Settings";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}


function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}


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
                 <Route path="/about">
                   <About />
                 </Route>
                 <Route path="/login">
                   <LoginForm/>
                 </Route>
                 <Route path="/singup">
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
