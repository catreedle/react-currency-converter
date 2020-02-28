import React from 'react';
import LandingPage from './LandingPage';
import Exchange from './FetchAPI';
import Saved from './Saved'
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {

    return (
        <div>
            <Router>
                <Route exact path="/" component={LandingPage} />
                <Route path="/exchange" component={Exchange} />
                <Route path="/saved" component={Saved} />
            </Router>
        </div>
    )
}

export default App