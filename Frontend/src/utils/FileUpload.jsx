import axios from "axios";
import React, { setState, useState } from "react";
import "./FileUpload.css";

const FormData = require("form-data");

function FileUpload() {
  const [selectedFile, setS] = useState(null);
  // Initially, no file is selected

  // On file select (from the pop up)
  const onFileChange = (event) => {
    // Update the state
    //alert(JSON.stringify(event.target.files[0]));
    setS(event.target.files[0]);
  };

  // On file upload (click the upload button)
  const onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    //console.log(selectedFile + " / " + selectedFile.name);

    // Update the formData object
    formData.append("myFile", selectedFile, selectedFile.name);

    //readFile(selectedFile);

    // Details of the uploaded file

    //console.log("formdata=" + formData.getAll("myFile"));

    /* for (var p of formData) {
      console.log("p=" + JSON.stringify(p));
    } */

    // Request made to the backend api
    // Send formData object
    axios
      .post("http://localhost:5000/api/uploadfile/load", formData)
      .then((res) => {
        return (
          <div>
            <p> File Name: {res.data} </p>
          </div>
        );
      });

    //alert(rs);
    //axios.post("api/uploadfile", formData);
  };

  function readFile(file) {
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      alert("file=" + event.target.result);
    });
    reader.readAsText(file);
  }

  // File content to be displayed after
  // file upload is complete
  const fileData = () => {
    if (selectedFile) {
      return (
        <div>
          <p> File Name: {selectedFile.name} </p>
          <p> File Type: {selectedFile.type} </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4> Choose file and click Upload </h4>
        </div>
      );
    }
  };

  return (
    <div className="fileupload__form">
      <div className="fileupload__form__input">
        <input accept=".csv" type="file" onChange={onFileChange} />
      </div>
      <div className="fileupload__form__button">
        <button onClick={onFileUpload}>Upload!</button>
      </div>
    </div>
  );
}

export default FileUpload;
