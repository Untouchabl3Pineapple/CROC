update();
wrap();

let client = new WebSocket("ws://localhost:8001");

client.onmessage = function (event) {
  response = event.data.text().then((success) => {
    if (success == "UPDATE MONITORING") {
      update();
      wrap();
    }
  });
};
