import React from 'react';
import Mainpage from './Mainpage';
import Register from './Register';
import Login from './Login';
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
                <Route path="/register" component={Register} />
                <Route path="/mainpage" component={Mainpage} />
                <Route component={Error} />
            </Switch>
        </Router>
    );

}

export default App;