update();

let client = new WebSocket("ws://localhost:8001");
console.log(client);

client.onopen = () => {
  placeButtons();
};
