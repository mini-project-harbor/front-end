import React from 'react';
import Login from "./components/login/Login";
import MainContent from "./components/mainContent/MainContent";
import './app.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import MasterHarbor from './components/harbor/MasterHarbor';
import MasterHarborUpdate from './components/harbor/MasterHarborUpdate';
import MasterShipUpdate from './components/ship/MasterShipUpdate';
import MasterShip from './components/ship/MasterShip';
import MasterDock from './components/dock/MasterDock';
import DetailsHarbor from './components/harbor/DetailsHarbor';
import MasterTransaction from './components/transaction/MasterTransaction';
import MasterTransactionUpdate from './components/transaction/MasterTransactionUpdate';


class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <PrivateRoute path='/protected/main/masterTransactionUpdate' Component={MasterTransactionUpdate} />
                    <PrivateRoute path='/protected/main/masterHarborUpdate' Component={MasterHarborUpdate} />
                    <PrivateRoute path='/protected/main/masterTransaction' Component={MasterTransaction} />
                    <PrivateRoute path='/protected/main/masterShipUpdate' Component={MasterShipUpdate} />
                    <PrivateRoute path='/protected/main/detailsHarbor' Component={DetailsHarbor} />
                    <PrivateRoute path='/protected/main/masterHarbor' Component={MasterHarbor} />
                    <PrivateRoute path='/protected/main/masterDock' Component={MasterDock} />
                    <PrivateRoute path='/protected/main/masterShip' Component={MasterShip} />
                    <PrivateRoute path='/protected/main' Component={MainContent} />
                    <Route path="/"
                        render={(props) => <Login {...props} />}
                    />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App;
