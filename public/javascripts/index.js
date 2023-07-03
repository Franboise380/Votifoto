const validateEmail2 = (email) => {
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ );
};

var element = document.getElementById("command-button");
element.addEventListener("click", function() {

});

const bouton = document.getElementById('command-button');
var hiddenBox = $( "#banner-message" );

bouton.addEventListener("click", function() {
    hiddenBox.show(); 
});

const boutonr = document.getElementById('route-button');
boutonr.addEventListener("click", function() {
    window.location.replace(window.location.href.split('/')[0] + "/blog"); 
});


$( "#button-container button" ).on( "click", function( event ) {
hiddenBox.show(); 
 
});

function handleSubmit(event) {
    event.preventDefault();
  
    var xhr = new XMLHttpRequest();
    const data = new FormData(event.target);
    const imageData = new FormData(event.target);

    xhr.open('POST','/imageRoute')
    xhr.setRequestHeader("Content-Type", "application/json");

    newData = Object.fromEntries(data);
    image = Object.fromEntries(data)['path'];
    newData["path"] = image["name"];

    xhr.send(JSON.stringify(newData));

    imageData.append("files", image);

    fetch("http://localhost:3000/upload_files", {
        method: 'POST',
        body: imageData,
        headers: {
          "Content-Type": undefined
        }
    })

    


    /*console.log(JSON.stringify(newData));

        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                form.reset(); //reset form after AJAX success or do something else
            }
        }

    //const value = Object.fromEntries(data.entries());
    //value.topics = data.getAll("topics");

    /*console.log(value);
    console.log(JSON.stringify(value));
    console.log(data);

    fetch("/imageRoute", {
        method: "POST", 
        body: JSON.stringify(value)
      }).then(res => {
        console.log("Request complete! response:", res);
      });*/
  }

const form = document.getElementById('imageForm');
form.addEventListener('submit', handleSubmit);

async function handleVote(event) {
    event.preventDefault();
    const id = event.srcElement.value;

    const image = await fetch("http://localhost:3000/voir/" +id).then(response => response.json());
    image["votes"] += 1;
    const name = image["name"];
    const url = "http://localhost:3000/image/" + id;

    fetch(url, {
        method: 'PUT',
        body: JSON.stringify(image),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((value) => {
        if(value.status == 200){
            let imgTools = Array.from(document.querySelectorAll('.' + name));
            imgTools.forEach(imt => {
                if(imt.tagName == "BUTTON"){
                    imt.remove();
                } else if(imt.tagName == "A") {
                    imt.innerHTML = "Votes : " + image["votes"];
                }
            });
        }
    })
}

const votes = Array.from(document.getElementsByClassName('votePlusButton'));
votes.forEach(vote => {
    vote.addEventListener('click', handleVote);
});

    
