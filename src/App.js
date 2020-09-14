import React from 'react';
import Register from './Register';
import Login from './Login';
import Mainpage from './Mainpage';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';


function App() {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login} exact />
                <Route path="/register" component={Register} exact />
                <Route path="/mainpage" component={Mainpage} exact />
                <Route component={Error} />
            </Switch>
        </Router>
    );
}

export default App;