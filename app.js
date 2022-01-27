const express = require("express");
const fs = require("fs");
const path = require("path");
const fileUpload = require("express-fileupload");
const cmd = require("./cmd");
const {getAllIps} = require("./utils");
const app = express();
const mime = require("mime-types");
const {pipeline} = require("stream");

const ips = getAllIps("v4");
const CMD = cmd(8000);
const PORT = CMD.PORT;
app.use(express.static("public"));
app.use("/form", express.static(path.join(__dirname, "public", "index.html")));

// default options
app.use(fileUpload());

app.get("/ping", function (req, res) {
  res.send("pong");
});
const DEFAULT_FOLDER_NAME = "uniis_share";
const CREATE_DIR = (FILE_UPLOAD_DIR = path.join(
    process.env.HOME || "",
    DEFAULT_FOLDER_NAME
));
fs.exists(CREATE_DIR, (doesFileExist) => {
  if (doesFileExist) return;
  fs.mkdir(CREATE_DIR, (err) => {
    console.warn(err, `CREATED_DIR @ ${CREATE_DIR}`);
  });
});

app.post("/upload", function (req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send("No files were uploaded.");
    return;
  }

  // console.log('req.files >>>', req.files); // eslint-disable-line
  function getNewFileName(fileName, append = "", dir = FILE_UPLOAD_DIR) {
    const extention = path.extname(fileName);
    fileName = fileName.slice(0, fileName.lastIndexOf(extention));
    return path.join(FILE_UPLOAD_DIR, fileName + append + extention);
  }

  sampleFile = req.files.file;
  let fileName = sampleFile.name;
  uploadPath = getNewFileName(fileName);
  let counter = 10;
  doesFileExist = true;

  do {
    doesFileExist = fs.existsSync(uploadPath);
    if (!doesFileExist) {
      break;
    }
    uploadPath = getNewFileName(fileName, `(${11 - counter})`);
    counter--;
  } while (counter >= 0);

  counter = 11 - counter;
  if (!doesFileExist) {
    sampleFile.mv(uploadPath, function (err) {
      if (err) {
        return res.status(500).send({err, message: err.message});
      }
      const message = `
      <h3>File uploaded to ${uploadPath}</h3>
      <h5>${
          counter > 1
              ? "You have " + counter + " possible file with same name"
              : ""
      }</h5>
      `;
      console.log({message});
      res.send(message);
    });
  } else {
    return res.status(400).send({
      message: `Seems you already uploaded the same file ${counter} times`,
    });
  }
});

// get all uploaded files
app.get("/files", function (req, res) {
  fs.readdir(CREATE_DIR, (err, files) => {
    const fileInfo = [];
    files.forEach((file) => {
      const stats = fs.statSync(CREATE_DIR + "/" + file);
      const fileSize = stats.size / (1024 * 1024);
      let hash = new Buffer(file).toString("base64");
      fileInfo.push({
        name: path.parse(file).name,
        id: hash,
        size: fileSize.toFixed(2) + "mb",
      });
    });
    res.json(fileInfo);
  });
});

app.get("/download/:id", function (req, res) {
  let buff = new Buffer(req.params.id, "base64").toString("ascii");
  res.download(CREATE_DIR + "/" + buff);
});

app.get("/stream/:id", function (req, res) {
  let buff = new Buffer(req.params.id, "base64").toString("ascii");
  const url = CREATE_DIR + "/" + buff;
  if (!mime.lookup(url)) {
    return res.sendFile(url);
  }
  const rr = fs.createReadStream(url);
  rr.on("data", (chunk) => {
    rr.pause();
    setTimeout(()=> rr.resume(), 1000)
    res.write(chunk);
  });
  rr.on("end", () => {
    console.log("end");
    res.end();
  });
});

app.get("/get/:id", function (req, res) {
  let buff = new Buffer(req.params.id, "base64").toString("ascii");
  const url = CREATE_DIR + "/" + buff;
    return res.sendFile(url);
});

app.all("*", (req, res) => {
  res.status(404).json("dead");
});
app.listen(PORT, function () {
  console.warn(
      (process.env.APP_NAME || "") + " Server listening on port ",
      PORT
  );
  ips.forEach((ip) => {
    if (!ip.includes("255.")) {
      console.error("\r\tAccess with \t ", ip + ":" + PORT);
    }
  });
});
