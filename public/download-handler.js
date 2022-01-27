const downloadSectionElem = document.querySelector("#download");
const filesSectionElem = document.querySelector("#download-section");
console.log(
  downloadSectionElem.style.display,
  "downloadSectionElem.style.display"
);
document
  .querySelector("#toggleDownload")
  .addEventListener("click", function () {
    const isNone = ["none", ""].includes(downloadSectionElem.style.display);
    downloadSectionElem.style.display = isNone ? "block" : "none";
  });
const fetchFileToDownload = () => {
  axios
    .get("/files")
    .then(function (resp) {
      resp.data.forEach(function (file) {
        createFileElem(
          { ...file, icon: "./direct-download.png" },
          filesSectionElem,
          false,
          function () {
            window.location.href = "/download/" + file.id;
          }
        );
      });
    })
    .catch(function (e) {
      console.log("mkn");
    });
};

function downloadFile(file) {
  // download
  window.location.href = "/download/" + file.id;
}
// createFileElem

fetchFileToDownload();
