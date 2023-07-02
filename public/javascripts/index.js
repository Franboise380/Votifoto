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

    xhr.open('POST','http://localhost:3000/imageRoute')
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(Object.fromEntries(data)));

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

    
