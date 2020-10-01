import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Button from "@material-ui/core/Button";
import logo from "./assets/logo.png";
import "./App.scss";

const App = () => {
  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader();

    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
      // Do whatever you want with the file contents
      // const binaryStr = reader.result;
      // console.log(binaryStr);
    };

    acceptedFiles.forEach((file, i) => {
      console.log("file: ", i + 1);
      // reader.readAsBinaryString(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop
  });
  const background = { background: isDragActive ? "#f30101" : "" };
  const styles = {
    border: isDragActive ? "2px solid red" : "",
    background: isDragActive ? "#f3010149" : ""
  };

  return (
    <div style={styles} className="backOver">
      <img alt="secure-sharer" src={logo} className="logo" />
      <div className="main" {...getRootProps()}>
        <div className="download-background">
          <span></span>
          <div className="content">
            <CloudUploadIcon className="icon" />
            <br />
            <h2>Drag and Drop files here</h2>
            <Button
              variant="contained"
              size="large"
              style={background}
              className="button"
            >
              SELECT FILE
            </Button>
            <input {...getInputProps()} />
          </div>
        </div>
        <div className="ripple"></div>
        <div className="ripple"></div>
        <div className="ripple"></div>
        <div className="ripple"></div>
      </div>
    </div>
  );
};

export default App;
