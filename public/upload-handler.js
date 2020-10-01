const userCanUpload = () => {
  const div = document.createElement("div");
  return (
    ("draggable" in div || ("ondragstart" in div && "ondrop" in div)) &&
    "FormData" in window &&
    "FileReader" in window &&
    typeof Promise !== "undefined" &&
    Promise.toString().indexOf("[native code]") !== -1 &&
    "Promise" in window
  );
};
const closeIcon =
  "https://www.iconfinder.com/data/icons/ionicons/512/icon-close-512.png";
// check if user's browser can upload file
if (!userCanUpload) {
  alert("Sorry your browser is outdated, update to use this app");
} else {
  // get elements (drag, input, and files section);
  const dragElem = document.querySelector(".drag-and-drop");
  const inputElem = document.querySelector("#upload-input");
  const filesSectionElem = document.querySelector("#section");

  // custom eventlistener wrapper
  const drag = onEvents(dragElem);
  const input = onEvents(inputElem);
  // const fSection = onEvents(filesSectionElem);

  // enable drag and drop
  drag("drag dragstart dragend dragover dragenter dragleave drop", (event) => {
    event.preventDefault();
    event.stopPropagation();
  });
  drag("dragover dragenter", (e) => {
    dragElem.classList.add("hightlight");
  });

  drag("dragleave dragend drop", (e) => {
    dragElem.classList.remove("hightlight");
  });

  drag("dragdrop drop", (e) => {
    // handle uploads
    const dataTransfer = e.originalEvent
      ? e.originalEvent.dataTransfer
      : e.dataTransfer || e;
    // console.log({dataTransfer})
    handleFileUpload(dataTransfer.files, filesSectionElem);
  });
  input("change", (event) => {
      handleFileUpload(event.target.files, filesSectionElem)
  })
}

function handleFileUpload(files, parentElement) {
  
  Array.from(files).forEach(async (file, index) => {
    const info = await getFileInfo(file);
    
    const id = info.id + info.name.replace(/[^a-zA-Z0-9]/g,'_')
    createFileElem({...info, id }, parentElement, index);
    const progress = document.querySelector( '#progress-' + id);
    const error = document.querySelector( '#error-' + id);
    // upload file, and show progressbar
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
         
            onUploadProgress: function(progressEvent) {
              const percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
              progress.style.width = `${percentCompleted}%`;
        }
      })
      .then(function () {
        console.log("SUCCESS!!");
        progress.style.backgroundColor = 'green';
      })
      .catch(function (e) {
        console.log("FAILURE!!", e);
        error.innerHTML = e?.response?.data?.message || e?.message
      });
  });
}
const bytesToMegaBytes = (bytes) => (bytes / (1024 * 1024)).toFixed(2);

const getExtention = (file) => {
  return file.slice((Math.max(0, file.lastIndexOf(".")) || Infinity) + 1);
};

async function getFileInfo(file) {
  const type = getExtention(file.name);
  let icon;
  const imgExist = await fetch(`/icons/${type}.svg`);
  if (!imgExist) {
    icon = `/icons/file.svg`
  } else {
    icon =  `/icons/${type}.svg`
  }
  
  return {
    name: file.name,
    type,
    size: bytesToMegaBytes(file.size) + "mb",
    icon,
  };
}

