update();

let client = new WebSocket("ws://localhost:8080");

client.onmessage = function(event) {
    response = event.data.text().then((success) => {
        if (success == "UPDATE BOARD") {
            console.log("update board");
            update();
        }
    });
};