import "./App.scss";
import Header from "../components/Header";
import Row from "../components/Row";
import Banner from "../components/Banner";
import Facility from "../components/Facility";
import Cart from "../components/Cart/Cart";
import Course from "../components/Course/Course";
import { adTop, adBottom, companies } from "../utils/customComponents";
import { Route, Switch } from "react-router-dom";
import Footer from "../components/Footer";
import FillerDiv from "../components/FillerDiv";
import TopCategories from "../components/TopCategories";
import VideoAd from "../components/VideoAd";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import Search from "../components/Search/Search";
import store from "../app/store";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser } from "../app/actions/authAction";
import jwt_decode from "jwt-decode";
import MyCourses from "../components/MyCourses/MyCourses";

const mainApp = (
  <>
    <div className="app__body">
      <Banner />
      {/* 
      <div className="app__ads">{adTop}</div>  
       <Row
        title="The world's largest selection of courses"
        description="Choose from 930,000 online video courses with new additions published every month"
      />  
     <div className="app__ads">{adBottom}</div>  
      <Row title="Students are viewing for " category="web-development" /> 
     <FillerDiv /> */}
      { <TopCategories /> }
      
     {/*  <Facility instructor />
      {companies}
      <Facility business />
      <VideoAd /> */}
    </div>
  </>
);

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
}

function App() {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/mycourses">
          <MyCourses />
        </Route>
        <Route path="/course/:courseId">
          <Course />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route exact path="/">
          {mainApp}
        </Route>
      </Switch>
      {/* {companies} */}
      {/* <Footer /> */}
    </div>
  );
}

export default App;