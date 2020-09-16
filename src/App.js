import React from 'react';
import Register from './pages/Register';
import Login from './pages/Login';
import Mainpage from './pages/Mainpage';
import errorPage from './pages/errorPage';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';


function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" component={Login} exact />
                <Route path="/register" component={Register} exact />
                <Route path="/mainpage" component={Mainpage} exact />
                <Route component={errorPage} />
            </Switch>
        </Router>
    );
}

export default App;