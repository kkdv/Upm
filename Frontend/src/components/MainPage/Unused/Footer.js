import React from "react";
import "./Footer.css";
import LMSLogo from "../../../images/logo/udemy.svg";

function Footer() {
  return (
    <div className="footer">
      <div className="upperDiv">
        <div className="linksContainer">
          <div className="linksDiv linksDiv1">
            <p> LMS for Business </p> <p> Teach on LMS </p> <p> Get the app </p>{" "}
            <p> About us </p> <p> Contact us </p>
          </div>{" "}
          <div className="linksDiv linksDiv2">
            <p> Careers </p> <p> Blog </p> <p> Help and Support </p>{" "}
            <p> Affliate </p> <p> </p>
          </div>{" "}
          <div className="linksDiv linksDiv3">
            <p> Terms </p> <p> Privacy policy and cookie policy </p>
            <p> Sitemap </p> <p> Featured courses </p> <p> </p>{" "}
          </div>{" "}
        </div>{" "}
        <div className="linksDiv linksDiv4"> </div>{" "}
      </div>{" "}
      <div className="lowerDiv">
        <img src={LMSLogo} className="lmsLogo" alt="logo" />
        <div className="copyrightDiv">
          <p> ©2020 LMS, Inc. </p>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default Footer;
