import React, { useState } from 'react';
import { auth } from './Firebase';
import { Link } from 'react-router-dom';
import FormNavBar from './components/FormNavBar';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 300,
        },
    },
}));


function Login() {

    const classes = useStyles();

    const [ userDetails, setUserDetails ] = useState({
        email: '',
        password: ''
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setUserDetails(prevValues => {
            return {
                ...prevValues,
                [name]: value
            }
        });
    }

    // will use this variable to determine which page (or route) to take user to.
    let toSignIn = true;

    async function signIntoAccount() {
        if (setRestrictions()) {
            await auth.signInWithEmailAndPassword(userDetails.email, userDetails.password)
                .catch(function(error) {
                    console.log(error.code, error.message);
                    alert('Invalid email and password.');
                    return toSignIn = false;
                });
            console.log('sign-in successful');
        }
        else {
            alert("Check your input details again");
            toSignIn = false;
        };
    }
    
    function setRestrictions() {
        if (userDetails.email.length > 5 && userDetails.password.length > 5) {
            return true;
        }
        else return false;
    }

    return (
        <>
            <FormNavBar />
            <form className={classes.root + ' form_style'} noValidate autoComplete="off">
                <TextField
                    // error
                    // helperText="Incorrect entry."
                    // id="standard-error-helper-text"
                    type="email"
                    name="email"
                    value={userDetails.email}
                    label="Email Address"
                    onChange={handleChange}
                    className="emailTextField"
                    style={{ marginTop: '5%' }}
                />
                <TextField
                    // error
                    // helperText="Incorrect entry."
                    // id="standard-error-helper-text"
                    type="password"
                    name="password"
                    value={userDetails.password}
                    label="Password"
                    onChange={handleChange}
                    className="passwordTextField"
                    style={{ marginTop: '5%' }}
                />
                <Button variant="contained" type="submit" onClick={signIntoAccount} className="form_button">
                    { toSignIn 
                        ? <Link to="/mainpage" className="main_text"> Login </Link>
                        : <Link to="/" className="main_text"> Login </Link>
                    }
                </Button>
                <p>
                    Don't have an account yet?
                    <Link to="/register" className="sub_text"> Register </Link>
                </p>
            </form>
        </>
    );

}

export default Login;