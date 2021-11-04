function getCookie(name) {
    let cookieValue = null;

    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();

            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }

    return cookieValue;
}


function dbPostButtonsEvents(buttonColor, buttonNumber) {
    const csrftoken = getCookie("csrftoken");
    console.log(csrftoken);
    
    let dbJson = {
        "buttoncolor": buttonColor,
        "number": buttonNumber,
    };

    let headers = {"X-CSRFToken": csrftoken}
    let temp = JSON.stringify(dbJson);
    console.log(temp);

    $.ajax({
        url: "http://127.0.0.1:8000/main/ButtonsEvents/",
        data: temp,
        headers: headers,
        method: "post",
        contentType: "application/json",
        dataType: "json",
        async: false,
        success: function(data){
            console.log(data);
        }
    });
}


function colorsSwitcher(event) {
    console.log(event);
    let buttonIdArray = event.target.id.split("_");
    let buttonNumber = buttonIdArray[0];
    let buttonCurrentColor = buttonIdArray[1];
    let buttonNextColor = buttonCurrentColor % 3 + 1;
    
    console.log(buttonIdArray);
    console.log(buttonNumber);
    console.log(buttonCurrentColor);

    dbPostButtonsEvents(buttonNextColor, buttonNumber);
    
    postHTML();

    // message to the server
    client.send("UPDATE BOARD");
}


function postHTML() {
    update();

    let topButtons = document.querySelectorAll("[class='accdient-registration-top']");
    let bottomButtons = document.querySelectorAll("[class='accdient-registration-bottom']");

    for (let i = 0; i < POSTS; ++i) {
        let topButton = document.getElementById(topButtons[i].id);
        let bottomButton = document.getElementById(bottomButtons[i].id);
        topButton.innerHTML = "<button id=" + topButtons[i].id + " class=topButton onclick=colorsSwitcher(event)> </button>";
        bottomButton.innerHTML = "<button id=" + bottomButtons[i].id + " class=bottomButton onclick=colorsSwitcher(event)> </button>";
    };
}


let client = new WebSocket("ws://localhost:8080");

client.onopen = () => {
    postHTML()
};
