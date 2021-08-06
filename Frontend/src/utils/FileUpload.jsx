import axios from "axios";
import React, { setState, useState } from "react";

const FormData = require("form-data");

function FileUpload() {
  const [selectedFile, setS] = useState(null);
  // Initially, no file is selected

  // On file select (from the pop up)
  const onFileChange = (event) => {
    // Update the state
    setS(event.target.files[0]);
  };

  // On file upload (click the upload button)
  const onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("myFile", selectedFile, selectedFile.name);

    // Details of the uploaded file
    console.log(selectedFile);

    for (var p of formData) {
      console.log(p);
    }

    // Request made to the backend api
    // Send formData object
    const { rs } = axios.post("http://localhost:5000/api/upload_file/load", {
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    //alert(rs);
    //axios.post("api/uploadfile", formData);
  };

  // File content to be displayed after
  // file upload is complete
  const fileData = () => {
    if (selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>

          <p>File Name: {selectedFile.name}</p>

          <p>File Type: {selectedFile.type}</p>

          <p>Last Modified: {selectedFile.lastModifiedDate.toDateString()}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  return (
    <div>
      <h1>GeeksforGeeks</h1>
      <h3>File Upload using React!</h3>
      <div>
        <input type="file" onChange={onFileChange} />
        <button onClick={onFileUpload}>Upload!</button>
      </div>
      {fileData()}
    </div>
  );
}

export default FileUpload;
