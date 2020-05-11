import React from "react";
import {makeStyles,theme} from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import Box from '@material-ui/core/Box';
import { Link as RouterLink } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Grid from "@material-ui/core/Grid";
import SvgIcon from "@material-ui/core/SvgIcon";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
      container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: 400,
        margin: `${theme.spacing(0)} auto`
      },
      loginBtn: {
        marginBottom: theme.spacing(2),
        flexGrow: 1
      },
      header: {
        textAlign: 'center',
        background: '#212121',
        color: '#fff'
      },
      card: {
        marginTop: theme.spacing(10)
      },
      CardActions:{
        'flex-wrap': 'wrap'
      },
      Oauth:{
        'margin-left': '0px !important'
      }

}));

function LoginForm(props) {
 const classes = useStyles();
 const [email, setEmail] = React.useState('');
 const [password, setPassword] = React.useState('');
 const [password2, setPassword2] = React.useState('');
 const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);
 const [helperText, setHelperText] = React.useState('');
 const [error, setError] = React.useState(false);
 function validateEmail(email) 
 {
     var re = /\S+@\S+\.\S+/;
     return re.test(email);
 }
 React.useEffect(() => {
    if (email.trim() && password.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, password]);

  const handleLogin = () => {
    if(validateEmail(email)){
      if(password.length > 7 && password.length<129 && password===password2){
        setError(false)
        setHelperText("check your email for activation link")
      }else{
        setError(true)
        setHelperText("passwords do not match")
      }
    }else{
      setError(true)
      setHelperText("email is invalid")
    }
    
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      isButtonDisabled || handleLogin();
    }
  };
  return (
    <form className={classes.container} noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardContent>
            <div>
              <TextField
                error={error}
                fullWidth
                id="email"
                type="email"
                label="Email"
                placeholder="Username"
                margin="normal"
                onChange={(e)=>setEmail(e.target.value)}
                onKeyPress={(e)=>handleKeyPress(e)}
              />
              <TextField
                error={error}
                fullWidth
                id="password"
                type="password"
                label="Password"
                placeholder="Password"
                margin="normal"
                onChange={(e)=>setPassword(e.target.value)}
                onKeyPress={(e)=>handleKeyPress(e)}
              />
              <TextField
                error={error}
                fullWidth
                id="password2"
                type="password"
                label="Repeat password"
                placeholder="Repeat password"
                margin="normal"
                helperText={helperText}
                onChange={(e)=>setPassword2(e.target.value)}
                onKeyPress={(e)=>handleKeyPress(e)}
              />
            </div>
          </CardContent>
          <CardActions  className={classes.CardActions}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              className={classes.loginBtn}
              onClick={()=>handleLogin()}
              disabled={isButtonDisabled}>
              SignUp
            </Button>
          </CardActions>
        </Card>
      </form>
  );
}

export default LoginForm;
