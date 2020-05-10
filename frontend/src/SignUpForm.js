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
 const [username, setUsername] = React.useState('');
 const [password, setPassword] = React.useState('');
 const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);
 const [helperText, setHelperText] = React.useState('');
 const [error, setError] = React.useState(false);

 React.useEffect(() => {
    if (username.trim() && password.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [username, password]);

  const handleLogin = () => {
    if (username === 'abc@email.com' && password === 'password') {
      setError(false);
      setHelperText('Login Successfully');
    } else {
      setError(true);
      setHelperText('Incorrect username or password')
    }
  };

  const handleKeyPress = (e:any) => {
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
                id="username"
                type="email"
                label="Username"
                placeholder="Username"
                margin="normal"
                onChange={(e)=>setUsername(e.target.value)}
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
                helperText={helperText}
                onChange={(e)=>setPassword(e.target.value)}
                onKeyPress={(e)=>handleKeyPress(e)}
              />
              <Box display="flex" justifyContent="flex-end">
              <Button color="primary" component={RouterLink} to="/dashboard">
               Sign up
             </Button>
           </Box>

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
              Login
            </Button>

            <Grid
              className={classes.Oauth}
              container
              direction="row"
              justify="center"
              spacing={1}
              alignItems="center"
            >
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={props.handleSync}
                  href="https://notesbackend.qwertyforce.ru:8080/auth/google"
                  startIcon={
                    <SvgIcon>
                      <FontAwesomeIcon icon={faGoogle} size="lg" />
                    </SvgIcon>
                  }
                >
                  Google
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={props.handleSync}
                  href="https://notesbackend.qwertyforce.ru:8080/auth/github"
                  startIcon={
                    <SvgIcon>
                      <FontAwesomeIcon icon={faGithub} size="lg" />
                    </SvgIcon>
                  }
                >
                  Github
                </Button>
              </Grid>
            </Grid>


          </CardActions>
        </Card>
      </form>
  );
}

export default LoginForm;
