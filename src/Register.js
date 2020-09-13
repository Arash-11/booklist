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


function Register() {

    const classes = useStyles();

    // if true, user will be taken to mainpage upon successful registration.
    // if false, user will get an alert and still be shown the registration page.
    let pathDecider = true;

    const [ userDetails, setUserDetails ] = useState({
        email: '',
        password: '',
        confirmPassword: ''
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

    function createUser() {
        if (setRestrictions()) {
            auth.createUserWithEmailAndPassword(userDetails.email, userDetails.password)
                .catch((error) => {
                    pathDecider = false;
                    console.log(error.code, error.message);
                });
        }
        else {
            pathDecider = false;
            alert("Check your input details again");
        };
    }
    
    function setRestrictions() {
        if (userDetails.email.length > 5 && userDetails.password.length > 5) {
            if (userDetails.password !== userDetails.confirmPassword) {
                pathDecider = false;
                alert("The passwords do not match. Please try again.")
            }
            return true;
        }
        else {
            pathDecider = false;
            return false;
        };
    }

    return (
        <>
            <FormNavBar />
            <form className={classes.root + ' form_style'} noValidate autoComplete="off">

            { pathDecider 
                ?    <>
                        <TextField
                            type="email"
                            name="email"
                            value={userDetails.email}
                            label="Email Address"
                            onChange={handleChange}
                            className="emailTextField"
                            style={{ marginTop: '5%' }}
                        />
                        <TextField
                            type="password"
                            name="password"
                            value={userDetails.password}
                            label="Password"
                            onChange={handleChange}
                            className="passwordTextField"
                            style={{ marginTop: '5%' }}
                        />
                        <TextField
                            type="password"
                            name="confirmPassword"
                            value={userDetails.confirmPassword}
                            label="Confirm Password"
                            onChange={handleChange}
                            className="passwordTextField"
                            style={{ marginTop: '5%' }}
                        />
                    </>
                :   <>
                        <TextField
                            error
                            helperText="Incorrect entry."
                            id="standard-error-helper-text"
                            type="email"
                            name="email"
                            value={userDetails.email}
                            label="Email Address"
                            onChange={handleChange}
                            className="emailTextField"
                            style={{ marginTop: '5%' }}
                        />
                        <TextField
                            error
                            helperText="Incorrect entry."
                            id="standard-error-helper-text"
                            type="password"
                            name="password"
                            value={userDetails.password}
                            label="Password"
                            onChange={handleChange}
                            className="passwordTextField"
                            style={{ marginTop: '5%' }}
                        />
                        <TextField
                            error
                            helperText="Incorrect entry."
                            id="standard-error-helper-text"
                            type="password"
                            name="confirmPassword"
                            value={userDetails.confirmPassword}
                            label="Confirm Password"
                            onChange={handleChange}
                            className="passwordTextField"
                            style={{ marginTop: '5%' }}
                        />
                    </>
            }
                <Button variant="contained" type="submit" onClick={createUser} className="form_button">
                    { pathDecider 
                        ? <Link to="/mainpage" className="main_text"> Register </Link>
                        : <Link to="/register" className="main_text"> Register </Link> 
                    }
                </Button>
                <p>
                    Have an account?
                    <Link to="/" className="sub_text"> Login </Link>
                </p>
            </form>
        </>
    );

}

export default Register;