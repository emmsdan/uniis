function createFileElem (info, parentElem) {
    
    const fileEl = document.createElement('div');
    fileEl.setAttribute('class', 'file')
    const fileElImage = document.createElement('img');
    fileElImage.setAttribute('class', 'icon');
    fileElImage.setAttribute('src', info.icon);
    
    fileEl.appendChild(fileElImage);
                        
    
    // attach description element to file element
    const fileElDescription = document.createElement('div');
    fileElDescription.setAttribute('class', 'description');
    
    fileElDescription.innerText = `${info.name} >> ${info.size}`;
    
    const fileElDescProgressContainer = document.createElement('div');
    fileElDescProgressContainer.setAttribute('class', 'progress-container')
    
    const fileElDescProgressBar = document.createElement('div');
    fileElDescProgressBar.setAttribute('class', 'progress')
    fileElDescProgressBar.setAttribute('id', 'progress-' + info.id)
    fileElDescProgressContainer.appendChild(fileElDescProgressBar);
    fileElDescription.appendChild(fileElDescProgressContainer)
    
    const fileElDescError = document.createElement('div');
    fileElDescError.setAttribute('class', 'error')
    fileElDescError.setAttribute('id', 'error-' + info.id)
    fileElDescription.appendChild(fileElDescError);
    
    fileEl.appendChild(fileElDescription)
    
    // attach cancel element to file element
    const fileElClose = document.createElement('div');
    fileElClose.setAttribute('class', 'close')
    const fileElCloseImage = document.createElement('img');
    fileElCloseImage.setAttribute('src', closeIcon)
    fileElClose.appendChild(fileElCloseImage);
    fileElClose.addEventListener('click', () => {
        fileEl.remove()    
    })
    fileEl.appendChild(fileElClose)
    
    // attach to parent
    parentElem.appendChild(fileEl)
}


function onEvents (element) {
    return (events, callback, bools=true)=> {
    events.split(" ").forEach(event => {
        element.addEventListener(event, callback, bools)
    })
    }
}
