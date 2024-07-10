import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage';
import RegistrationForm from './RegistrationForm';

function PageRouter() {
    return () => (
        <div>
        <Router>
            <Switch>
                <Route exact path="/"> <LandingPage /> </Route>
                <Route exact path="/register"> <RegistrationForm /> </Route>
                <Route exact path="/login"> <LoginForm /> </Route>
            </Switch>
        </Router>
        <LandingPage />
        </div>
    );
}

export default PageRouter;