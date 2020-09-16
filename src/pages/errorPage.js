import React from 'react';
import FormNavBar from '../components/FormNavBar';
import { Link } from 'react-router-dom';

function errorPage() {

    return (
        <>
            <FormNavBar />
            <div className="form_style">
                <h1 className="form_style_h1">404 Error</h1>
                <h4 className="form_style_h4">This page doesn't exist.</h4>
                <p className="errorPage-text">
                    Don't have an account yet?
                    <Link to="/register" className="sub_text"> Register</Link>
                </p>
                <p className="errorPage-text">
                    Have an account?
                    <Link to="/" className="sub_text"> Login</Link>
                </p>
            </div>
        </>
    );
}

export default errorPage;