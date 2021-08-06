import "./App.scss";
import Header from "../components/MainPage/Header";
import Banner from "../components/MainPage/Banner";
import Cart from "../components/Cart/Cart";
import Course from "../components/Course/Course";
import { Route, Switch } from "react-router-dom";
import TopCategories from "../components/MainPage/TopCategories";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import Search from "../components/Search/Search";
import store from "../app/store";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser } from "../app/actions/authAction";
import jwt_decode from "jwt-decode";
import MyCourses from "../components/MyCourses/MyCourses";
import FileUpload from "../../src/utils/FileUpload.jsx";
const mainApp = (
  <>
    <div className="app__body">
      {<Banner />} {<TopCategories />}
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
      </Switch>
    </div>
  );
}

export default App;
