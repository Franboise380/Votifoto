const validateEmail2 = (email) => {
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ );
};

const boutonr = document.getElementById('btnUpload');
boutonr.addEventListener("click", function() {
    window.location.replace(window.location.href.split('/')[0] + "/upload"); 
});


$( "#button-container button" ).on( "click", function( event ) {
hiddenBox.show(); 
 
});

var note = 0;

async function handleVote(event) {
    event.preventDefault();
    const id = event.srcElement.value;

    const image = await fetch("http://localhost:3000/voir/" +id).then(response => response.json());
    image["votes"] += note;
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

const pvotes = Array.from(document.getElementsByClassName('votePlusButton'));
pvotes.forEach(vote => {
    vote.addEventListener('click', function(){
        note = 1;
        handleVote(event);
    });
});

const mvotes = Array.from(document.getElementsByClassName('voteMoinsButton'));
mvotes.forEach(vote => {
    vote.addEventListener('click', function(){
        note = -1;
        handleVote(event);
    });
});

    
