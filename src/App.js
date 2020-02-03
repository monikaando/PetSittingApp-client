import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "../src/components/auth/Signup";
import Login from "../src/components/auth/Login";
import AddCustomer from "./pages/AddCustomer";
import AddPets from "./pages/AddPets";
import EditPet from "./pages/EditPet";
import Overview from "./pages/Overview";

//Redux
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/layout/Navbar";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import CustomersList from "./pages/CustomersList";
import CustomerDetails from "./pages/CustomerDetails";
import PageNotFound from "./pages/PageNotFound";
import AddJob from "./pages/AddJob";
import EditJob from "./pages/EditJob";
import EditCustomer from "./pages/EditCustomer";
import PrivateRoute from "./components/routing/PrivateRoute";
import "./App.scss";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []); //it runs only once, without [] it will run constantly, similar to DidMount
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/auth/overview" component={Overview} />
            <PrivateRoute
              exact
              path="/auth/addcustomer"
              component={AddCustomer}
            />
            <PrivateRoute
              exact
              path="/auth/customers/edit/:id"
              component={EditCustomer}
            />
            <PrivateRoute exact path="/auth/addpet" component={AddPets} />
            <PrivateRoute exact path="/auth/pet/edit/:id" component={EditPet} />
            <PrivateRoute
              exact
              path="/auth/customers"
              component={CustomersList}
            />
            <PrivateRoute
              exact
              path="/auth/customers/:id"
              component={CustomerDetails}
            />
            <PrivateRoute exact path="/auth/addjob/:id" component={AddJob} />
            <PrivateRoute exact path="/auth/editjob/:id" component={EditJob} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
