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



//   -- Удаление триггера T1
// DROP TRIGGER IF EXISTS T1 ON ButtonsEvents;

// -- Удаление функции InsertInEvents()
// DROP FUNCTION IF EXISTS InsertInEvents();

// -- Создание функции InsertInEvents()
// CREATE OR REPLACE FUNCTION InsertInEvents()
// RETURNS TRIGGER
// AS $$
// BEGIN
//     IF NEW.buttoncolor = 1 THEN
//         INSERT INTO Events (ID, ButtonEvent_ID)
//         VALUES             (gen_random_uuid(), NEW.ID);
//     END IF;
	
// 	IF NEW.buttoncolor = 2 THEN
// 		UPDATE Events
//         SET fixingtime=current_timestamp
// 		WHERE ButtonEvent_ID=NEW.id;
// 	END IF;

//     RETURN NULL;
// END;
// $$ LANGUAGE PLPGSQL;

// /*
//     Создание триггера T1, который реагирует на нажатие кнопки
//     и заносит информацию в Events
// */
// CREATE TRIGGER T1
// AFTER INSERT ON ButtonsEvents FOR EACH ROW
// EXECUTE PROCEDURE InsertInEvents();

// // f2659679-5789-40d9-8bde-eaa61856f507


// select number
// from buttonsevents be join events e on e.buttonevent_id=be.id
// where be.id='f2659679-5789-40d9-8bde-eaa61856f507'




// -- Удаление триггера T1
// DROP TRIGGER IF EXISTS T1 ON ButtonsEvents;

// -- Удаление функции InsertInEvents()
// DROP FUNCTION IF EXISTS InsertInEvents();

// -- Создание функции InsertInEvents()
// CREATE OR REPLACE FUNCTION InsertInEvents()
// RETURNS TRIGGER
// AS $$
// BEGIN
//     IF NEW.buttoncolor = 1 THEN
//         INSERT INTO Events (ID, ButtonEvent_ID)
//         VALUES             (gen_random_uuid(), NEW.ID);
//     END IF;
	
// 	IF NEW.buttoncolor = 2 THEN
// 		UPDATE Events
//         SET fixingtime=current_timestamp
// 		WHERE ButtonEvent_ID=(select number
// 								from buttonsevents be join events e on e.buttonevent_id=be.id
// 								where be.id=NEW.id);
// 	END IF;

//     RETURN NULL;
// END;
// $$ LANGUAGE PLPGSQL;

// /*
//     Создание триггера T1, который реагирует на нажатие кнопки
//     и заносит информацию в Events
// */
// CREATE TRIGGER T1
// AFTER INSERT ON ButtonsEvents FOR EACH ROW
// EXECUTE PROCEDURE InsertInEvents();