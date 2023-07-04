/*async function handleSearch(event) {
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
        handleSearch(event);
    });
});*/