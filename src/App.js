import React from 'react';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import MainPage from './pages/index'


function App() {
    return <BrowserRouter>
        <Switch>
            <Route exact path="/" component={MainPage}/>
        </Switch>
    </BrowserRouter>

}

export default App;
