import React, { useState } from 'react';
import { auth } from '../Firebase';
import { Link } from 'react-router-dom';
import FormNavBar from '../components/FormNavBar';
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
    const { email, password } = userDetails;

    function handleChange(event) {
        const { name, value } = event.target;
        setUserDetails(prevValues => {
            return {
                ...prevValues,
                [name]: value
            }
        });
    }

    function logIn() {
        auth.signInWithEmailAndPassword(email, password)
            .then(() => window.location.pathname = '/mainpage')
            .catch(function(error) {
                console.log(error.code, error.message);
                alert('Invalid email and password.');
                window.location.pathname = '/';
            });
    }

    function handleSubmit(e) {
        logIn();
        e.preventDefault();
    }

    return (
        <>
            <FormNavBar />
            <form className={classes.root + ' form_style'} onSubmit={handleSubmit} noValidate autoComplete="off">
                <TextField
                    type="email"
                    name="email"
                    value={userDetails.email}
                    label="Email Address"
                    inputProps={{ 'aria-label': 'description' }}
                    onChange={handleChange}
                    className="emailTextField"
                    style={{ marginTop: '5%', width:'80%' }}
                />
                <TextField
                    type="password"
                    name="password"
                    value={userDetails.password}
                    label="Password"
                    inputProps={{ 'aria-label': 'description' }}
                    onChange={handleChange}
                    className="passwordTextField"
                    style={{ marginTop: '5%', width:'80%' }}
                />
                <Button variant="contained" type="submit" className="form_button">
                    <h4 className="main_text">Login</h4>
                </Button>
                <p>
                    Don't have an account yet?
                    <Link to="/register" className="sub_text"> Register</Link>
                </p>
            </form>

        </>
    );

}

export default Login;