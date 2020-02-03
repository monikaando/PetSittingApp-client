import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import "../../App.scss";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <div className="columns">
      <div className="column is-full-mobile">
        <div className="columns has-text-centered-mobile has-padding-bottom-50 has-padding-top-15">
          <a className="column has-margin-left-30" href="/">
            <img
              src="../images/logoPetSitterApp.png"
              alt="logo"
              width="150px"
            />
          </a>
          <div>
            <Link
              to="/auth/overview"
              className="button is-warning has-text-weight-bold has-margin-right-20 has-margin-left-5 mobile is-marginless-mobile is-size-7-mobile has-margin-top-5"
            >
              Overview
            </Link>

            <Link
              to="/auth/customers"
              className="button is-primary has-text-weight-bold is-marginless-mobile has-margin-right-20 is-size-7-mobile has-margin-top-5"
            >
              Customers
            </Link>

            <Link
              to="/auth/addcustomer"
              className="button is-info has-text-weight-bold has-margin-right-20 is-marginless-mobile is-size-7-mobile has-margin-top-5"
            >
              <i className="fa fa-plus has-margin-right-5"></i> Customer
            </Link>

            <a
              className="button is-link has-text-weight-bold has-margin-right-40 has-margin-right-5-mobile is-marginless-mobile is-size-7-mobile has-margin-top-5"
              onClick={logout}
              href="/"
            >
              <i className="fas fa-sign-out-alt"></i>
              <span className="has-text-weight-bold is-hidden-mobile">
                Logout
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
  const guestLinks = (
    <div className="columns">
      <div className="column is-full-mobile">
        <div className="columns has-text-centered-mobile has-padding-bottom-50 has-padding-top-15">
          <a
            className="column has-margin-left-30 is-marginless-mobile"
            href="/"
          >
            <img
              src="../images/logoPetSitterApp.png"
              alt="logo"
              width="150px"
            />
          </a>
          <div>
            <Link
              to="/signup"
              className="button is-primary has-text-weight-bold has-margin-right-20 is-size-7-mobile has-margin-top-5 has-margin-left-60-mobile"
            >
              Sign up
            </Link>

            <Link
              to="/login"
              className="button is-info has-text-weight-bold has-margin-right-40 has-margin-right-30-mobile is-size-7-mobile has-margin-top-5"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </div>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logout })(Navbar);
