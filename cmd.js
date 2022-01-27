const fs = require("fs");
module.exports = exports = function (options = {}) {
  const [, , ...userInput] = process.argv;

  const DEFAULTS = {
    PORT: options && options.PORT ? options.PORT : 10000,
    HOST: options && options.HOST ? options.HOST : "localhost",
    FILE_TYPES: "*",
    // FILE_UPLOAD_DIR:
    HOME_DIR: process.env.HOME,
  };

  const CMD = [
    { name: "PORT", values: ["p", "port"] },
    { name: "HOST", values: ["h", "host"] },
    { name: "HOME_DIR", values: ["base", "home", "dir"] },
  ];

  const platform = process.platform;
  const platforms = ["linux", "win", "mac"];

  userInput.forEach((arg) => {
    CMD.forEach((cmd) => {
      cmd.values.forEach((cmdArg) => {
        const seperator = `-${cmdArg}=`;
        if (arg.includes(seperator)) {
          DEFAULTS.PORT = Number(arg.replace(seperator, ""));
        }
      });
    });
  });
  return DEFAULTS;
};

// console.log()

fs.readdir(process.env.HOME, (e, f) => {
  const DEFAULT_FOLDER_NAME = "uniis_share";
  // if ()
});
