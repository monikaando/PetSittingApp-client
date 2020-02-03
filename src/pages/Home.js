import React, { Fragment } from "react";
import HomePageLayout from "../components/layout/HomePage";
import CalendarLayout from "../components/layout/Calendar";
import "../App.scss";
import Navbar from "../components/layout/Navbar";
import Calendar from "../components/myCalendar";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/auth";

const Home = ({ auth: { isAuthenticated, loading } }, props) => {
  const Private = (
    <Fragment>
      <CalendarLayout>
        <Calendar />
      </CalendarLayout>
    </Fragment>
  );
  const Public = (
    <Fragment>
      <HomePageLayout>
        <img src="../images/cat13.png" alt="cat"></img>
      </HomePageLayout>
    </Fragment>
  );

  return (
    <div>
      {!loading && <Fragment>{isAuthenticated ? Private : Public}</Fragment>}
    </div>
  );
};
Home.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logout })(Home);
