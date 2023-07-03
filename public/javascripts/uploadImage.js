const boutonr = document.getElementById('btnMain');
boutonr.addEventListener("click", function() {
    window.location.replace(window.location.href.split('/')[0] + "/"); 
});

function handleSubmit(event) {
    event.preventDefault();
  
    var xhr = new XMLHttpRequest();
    const data = new FormData(event.target);
    const imageData = new FormData(event.target);

    xhr.open('POST','/imageRoute')
    xhr.setRequestHeader("Content-Type", "multipart/form-data");

    newData = Object.fromEntries(data);
    image = Object.fromEntries(data)['path'];
    newData["path"] = image["name"];

    xhr.send(JSON.stringify(newData));

    imageData.append("files", image);

  }

const form = document.getElementById('imageForm');
//form.addEventListener('submit', handleSubmit);