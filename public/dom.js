function createFileElem(
  info,
  parentElem,
  showCloseButton = true,
  events = null
) {
  const fileEl = document.createElement("div");
  fileEl.setAttribute("class", "file");
  fileEl.addEventListener("click", events);
  const fileElImage = document.createElement("img");
  fileElImage.setAttribute("class", "icon");
  fileElImage.setAttribute("src", info.icon);

  fileEl.appendChild(fileElImage);

  // attach description element to file element
  const fileElDescription = document.createElement("div");
  fileElDescription.setAttribute("class", "description");

  fileElDescription.innerText = `${info.name} >> ${info.size}`;

  const fileElDescProgressContainer = document.createElement("div");
  fileElDescProgressContainer.setAttribute("class", "progress-container");
  fileElDescProgressContainer.setAttribute(
    "id",
    "progress-container-" + info.id
  );

  const fileElDescProgressBar = document.createElement("div");
  fileElDescProgressBar.setAttribute("class", "progress");
  fileElDescProgressBar.setAttribute("id", "progress-" + info.id);
  fileElDescProgressContainer.appendChild(fileElDescProgressBar);
  fileElDescription.appendChild(fileElDescProgressContainer);

  const fileElDescError = document.createElement("div");
  fileElDescError.setAttribute("class", "error");
  fileElDescError.setAttribute("id", "error-" + info.id);
  fileElDescription.appendChild(fileElDescError);

  fileEl.appendChild(fileElDescription);

  if (showCloseButton) {
    // attach cancel element to file element
    const fileElClose = document.createElement("div");
    fileElClose.setAttribute("class", "close");
    const fileElCloseImage = document.createElement("img");
    fileElCloseImage.setAttribute("src", "./icon-close-512.png");
    fileElClose.appendChild(fileElCloseImage);
    fileElClose.addEventListener("click", () => {
      fileEl.remove();
    });
    fileEl.appendChild(fileElClose);
  }
  // attach to parent
  parentElem.appendChild(fileEl);
}

function onEvents(element) {
  return (events, callback, bools = true) => {
    events.split(" ").forEach((event) => {
      element.addEventListener(event, callback, bools);
    });
  };
}
