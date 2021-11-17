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
  let buttonIdArray = event.target.id.split("_");
  let buttonNumber = buttonIdArray[0];
  let buttonCurrentColor = buttonIdArray[1];

  if (buttonCurrentColor == RED_COLOR || buttonCurrentColor == YELLOW_COLOR) {
    let buttonNextColor = (buttonCurrentColor % 2) + 1;

    dbPostButtonsEvents(buttonNextColor, buttonNumber);
    placeButtons();

    // message to the server
    client.send("UPDATE MONITORING");
  }
}

function pressAllButtons(event) {
  let buttonId = event.target.id;
  let buttonColor;

  if (buttonId == "buttonStart") {
    buttonColor = YELLOW_COLOR;
  } else {
    buttonColor = GREEN_COLOR;
  }

  $.ajax({
    url: "http://127.0.0.1:8000/main/ButtonsPosts/?format=json",
    method: "get",
    dataType: "json",
    async: false,
    success: function (data) {
      for (let i = 0; i < data.length; ++i) {
        if (data[i].leftcolor != buttonColor) {
          dbPostButtonsEvents(buttonColor, data[i].leftside);
        }
        if (data[i].rightcolor != buttonColor) {
          dbPostButtonsEvents(buttonColor, data[i].rightside);
        }
      }
      placeButtons();
      client.send("UPDATE MONITORING");
    },
  });
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
      topButton.innerHTML =
        "<button id=" +
        topButtons[i].id +
        " class=topButton onclick=colorsSwitcher(event)> </button>";
      bottomButton.innerHTML =
        "<button id=" +
        bottomButtons[i].id +
        " class=bottomButton onclick=colorsSwitcher(event)> </button>";
    }
  }
