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

const mainApp = (
  <>
    <div className="app__body">
      <Banner />
      <div className="app__ads">{adTop}</div>
      <Row
        title="The world's largest selection of courses"
        description="Choose from 130,000 online video courses with new additions published every month"
      />
      <div className="app__ads">{adBottom}</div>
      <Row title="Students are viewing" />
      <FillerDiv />
      <TopCategories />
      <Facility instructor />
      {companies}
      <Facility buisness />
      <VideoAd />
    </div>
  </>
);
function App() {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route path="/cart">
          <Cart />
          {companies}
        </Route>
        <Route path="/search">
          <Search />
          {companies}
        </Route>
        <Route path="/course/:courseId">
          <Course />
          {companies}
        </Route>
        <Route path="/login">
          <Login />
          {companies}
        </Route>
        <Route path="/signup">
          <Signup />
          {companies}
        </Route>
        <Route exact path="/">
          {mainApp}
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
