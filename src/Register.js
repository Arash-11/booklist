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

    const [ userDetails, setUserDetails ] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const { email, password, confirmPassword } = userDetails;

    const [ validationState, setValidationState ] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        setUserDetails(prevValues => {
            return {
                ...prevValues,
                [name]: value
            }
        });
        if (name === 'confirmPassword') {
            if (email.length > 5 && password === value) {
                setValidationState(true);
            }
            else setValidationState(false);
        }
    }

    function createUser() {
        auth.createUserWithEmailAndPassword(email, password)
            .catch((error) => {
                console.log(error.code, error.message);
            });
    }

    function showError() {
        alert('Invalid input fields. Please try again.')
    }


    return (
        <>
            <FormNavBar />
            <form className={classes.root + ' form_style'} noValidate autoComplete="off">
                <TextField
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    label="Email Address"
                    className="emailTextField"
                    style={{ marginTop: '5%' }}
                    // error
                    // helperText="Incorrect entry."
                    // id="standard-error-helper-text"
                />
                <TextField
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    label="Password (minimum 6 characters)"
                    className="passwordTextField"
                    style={{ marginTop: '5%' }}
                    // error
                    // helperText="Incorrect entry."
                />
                <TextField
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    label="Confirm Password"
                    className="passwordTextField"
                    style={{ marginTop: '5%' }}
                    // error
                    // helperText="Incorrect entry."
                />
                { validationState
                    ? (<Button variant="contained" type="submit" onClick={createUser} className="form_button">
                            <Link to="/mainpage" className="main_text">Register</Link>
                        </Button>)
                    : (<Button variant="contained" type="submit" onClick={showError} className="form_button">
                            <h4 className="main_text inactive_state">Register</h4>
                        </Button>)
                }
                <p>
                    Have an account?
                    <Link to="/login" className="sub_text"> Login </Link>
                </p>
            </form>
        </>
    );

}

export default Register;