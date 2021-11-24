function getCookie(name) {
  let cookieValue = null;

  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();

      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }

  return cookieValue;
}

function dbPostButtonsEvents(buttonColor, buttonNumber) {
  const csrftoken = getCookie("csrftoken");

  let dbJson = {
    buttoncolor: buttonColor,
    number: buttonNumber,
  };

  let headers = { "X-CSRFToken": csrftoken };
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
  });
}

function colorsSwitcher(event) {
  window.location.replace("#close_window");

  let buttonIdArray = event.target.id.split("_");
  let buttonNextColor = buttonIdArray[0];
  let buttonNumber = buttonIdArray[1];

  if (buttonNextColor == "buttonRed") {
    buttonNextColor = 1;
  } else if (buttonNextColor == "buttonYellow") {
    buttonNextColor = 2;
  } else {
    buttonNextColor = 3;
  }

  dbPostButtonsEvents(buttonNextColor, buttonNumber);
  placeButtons();

  // message to the server
  client.send("UPDATE MONITORING");
}

function loadWindow(buttonId) {
  let windowDiv = document.createElement("div");
  windowDiv.id = "button_selection_" + buttonId;
  document.body.append(windowDiv);

  let windowWindow = document.createElement("window");
  windowDiv.append(windowWindow);

  let selectionTitleDiv = document.createElement("div");
  selectionTitleDiv.className = "selectionTitle";
  selectionTitleDiv.append("Выберите цвет кнопки");
  windowWindow.append(selectionTitleDiv);

  let redButton = document.createElement("button");
  redButton.id = "buttonRed_" + buttonId;
  redButton.className = "selectionButton";
  redButton.style = "background-color: rgb(255, 0, 0)";
  redButton.onclick = colorsSwitcher;
  redButton.append("Красная кнопка");
  windowWindow.append(redButton);

  let yellowButton = document.createElement("button");
  yellowButton.id = "buttonYellow_" + buttonId;
  yellowButton.className = "selectionButton";
  yellowButton.style = "background-color: rgb(255, 255, 0)";
  yellowButton.onclick = colorsSwitcher;
  yellowButton.append("Желтая кнопка");
  windowWindow.append(yellowButton);

  let greenButton = document.createElement("button");
  greenButton.id = "buttonGreen_" + buttonId;
  greenButton.className = "selectionButton";
  greenButton.style = "background-color: rgb(0, 255, 0)";
  greenButton.onclick = colorsSwitcher;
  greenButton.append("Зеленая кнопка");
  windowWindow.append(greenButton);
}

function placeButtons() {
  update();

  let topButtons = document.querySelectorAll(
    "[class='accdient-registration-top']"
  );
  let bottomButtons = document.querySelectorAll(
    "[class='accdient-registration-bottom']"
  );

  for (let i = 0; i < POSTS; ++i) {
    let topButton = document.getElementById(topButtons[i].id);
    let bottomButton = document.getElementById(bottomButtons[i].id);

    loadWindow(topButton.id);
    loadWindow(bottomButton.id);

    topButton.innerHTML =
      "<button id=" +
      topButton.id +
      " class=topButton onclick=window.location.href='#button_selection_" +
      topButton.id +
      "' </button>";
    bottomButton.innerHTML =
      "<button id=" +
      bottomButton.id +
      " class=bottomButton onclick=window.location.href='#button_selection_" +
      bottomButton.id +
      "' </button>";
  }
}
