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


function Register() {

    const classes = useStyles();

    const [ userDetails, setUserDetails ] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const { email, password, confirmPassword } = userDetails;

    const [ validationState, setValidationState ] = useState(false);

    const emailRegex = /\S+@\S+\.\S+/ ;

    function handleChange(event) {
        const { name, value } = event.target;
        setUserDetails(prevValues => {
            return {
                ...prevValues,
                [name]: value
            }
        });
        if (name === 'confirmPassword') {
            if (emailRegex.test(email) && password.length > 5 && password === value) {
                setValidationState(true);
            }
            else setValidationState(false);
        }
    }

    function handleSubmit(e) {
        validationState ? createUser() : showError();
        e.preventDefault();
    }

    function createUser() {
        auth.createUserWithEmailAndPassword(email, password)
            .then(() => window.location.pathname = '/mainpage')
            .catch((error) => {
                console.log(error.code, error.message);
                if (error.code === 'auth/email-already-in-use') {
                    alert(error.message);
                }
                else alert('An error occurred. Please try again');
                window.location.pathname = '/register';
            });
    }

    function showError() {
        // alert('Invalid input fields. Please try again.');
        if (emailRegex.test(email) === false) {
            alert('Invalid email format.')
        }
        else if (password.length < 6) {
            alert('Password should be at least 6 characters.');
        }
        else alert('Invalid input fields. Please try again.');
    }


    return (
        <>
            <FormNavBar />
            <form className={classes.root + ' form_style'} onSubmit={handleSubmit} noValidate autoComplete="off">
                <TextField
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    label="Email Address"
                    style={{ marginTop: '7%', width:'82%' }}
                />
                <TextField
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    label="Password (min. 6 characters)"
                    style={{ marginTop: '7%', width: '82%' }}
                />
                <TextField
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    label="Confirm Password"
                    style={{ marginTop: '7%', width:'82%' }}
                />
                <Button variant="contained" type="submit" className="form_button">
                    <h4 className="main_text">Register</h4>
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