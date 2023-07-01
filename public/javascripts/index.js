const validateEmail2 = (email) => {
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ );
};

var element = document.getElementById("command-button");
element.addEventListener("click", function() {

});

console.log("non");

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

    
