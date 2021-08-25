import "./App.scss";
import Header from "../components/MainPage/Header.jsx";
import Banner from "../components/MainPage/Banner.jsx";
import Cart from "../components/Cart/Cart.jsx";
import Course from "../components/Course/Course.jsx";
import { Route, Switch } from "react-router-dom";
import TopCategories from "../components/MainPage/TopCategories.jsx";
import Login from "../components/Authentication/Login.jsx";
import Signup from "../components/Authentication/Signup.jsx";
import Search from "../components/Search/Search.jsx";
import store from "../app/store";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser } from "../app/actions/authAction";
import jwt_decode from "jwt-decode";
import MyCourses from "../components/MyCourses/MyCourses.jsx";
import FileUpload from "../utils/FileUpload.jsx";
import StartCourse from "../components/MyCourses/StartCourse.jsx";
import Profile from "../components/Authentication/Profile";
const mainApp = (
  <>
    <div className="app__body">
      {<Banner />}
      {<TopCategories />}
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
        <Route path="/fileupload">
          <FileUpload />
        </Route>
        <Route path="/startcourse/:courseID">
          <StartCourse />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
