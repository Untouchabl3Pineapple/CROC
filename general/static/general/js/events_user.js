const HEADS = 5 ;
const HEAD = [
  "№ Поста",
  "Тип происшествия",
  "Описание",
  "Время фиксации",
  "Время устранения",
];
const COLUMN_WIDTH = [
  "width: 10%", 
  "width: 20%",
  "width: 40%",
  "width: 15%",
  "width: 15%",
];
const COUNT_HISTORY_LINES = 10;

function show_events_temp(jsonEvents) {
  let eventsDiv = document.createElement("div");
  eventsDiv.id = "eventdiv";
  eventsDiv.className = "eventDiv";
  document.body.append(eventsDiv);

  let eventsTable = document.createElement("table");
  eventsTable.className = "eventsTable";
  eventsDiv.append(eventsTable);

  let eventsHead = document.createElement("thead");
  eventsHead.className = "eventsHead";
  eventsTable.append(eventsHead);

  let eventsHeadRow = document.createElement("tr");
  eventsHeadRow.className = "eventsHeadRow";
  eventsHead.append(eventsHeadRow);

  for (let i = 0; i < HEADS; i++) {
    let eventsHeadNum = document.createElement("td");
    eventsHeadNum.id = "evnetsHeadNum" + i;
    eventsHeadNum.style = COLUMN_WIDTH[i];
    eventsHeadNum.className = "eventsHeadTd";
    eventsHeadNum.innerHTML = HEAD[i];
    eventsHeadRow.append(eventsHeadNum);
  }

  let eventsTBody = document.createElement("tbody");
  eventsTBody.className = "eventsTBody";
  eventsTable.append(eventsTBody);

  let eventTypesJson;
  $.ajax({
    url: "http://127.0.0.1:8000/main/EventsTypes/?format=json",
    method: "get",
    dataType: "json",
    async: false,
    success: function (data) {
      eventTypesJson = data;
    },
  });

  for (let i = 0; i < COUNT_HISTORY_LINES; i++) {
    let eventsBodyRowNum = document.createElement("tr");
    eventsBodyRowNum.id = "eventsBodyRowNum" + i;
    eventsTBody.append(eventsBodyRowNum);

    eventsBodyRowNum.className = "eventsBodyRowOdd";

    let postNum = document.createElement("td");
    postNum.innerHTML = i;
    postNum.className = "eventsTd";
    postNum.id = "post" + i;
    eventsBodyRowNum.append(postNum);

    let typeEvent = document.createElement("td");
    typeEvent.id = "type_event" + i;
    typeEvent.className = "typeEvent";
    typeEvent.innerHTML = eventTypesJson[0].eventtype;

    eventsBodyRowNum.append(typeEvent);

    let descriptionAddButton = document.createElement("td");

    if (jsonEvents[i].eventdescription == null) {
      descriptionAddButton.innerHTML = "-";
    } else {
      descriptionAddButton.innerHTML = jsonEvents[i].eventdescription;
    }

    descriptionAddButton.id = "desc" + i;
    descriptionAddButton.className = "descriptionButton";
    eventsBodyRowNum.append(descriptionAddButton);


    let timeDetection = document.createElement("td");
    timeDetection.innerHTML =
      jsonEvents[i].detectingtime.split(".")[0].split("T")[0] + "\n" +
      jsonEvents[i].detectingtime.split(".")[0].split("T")[1];

    timeDetection.className = "eventsTd";
    timeDetection.id = "detect" + i;
    eventsBodyRowNum.append(timeDetection);

    let timeFixing = document.createElement("td");
    timeFixing.className = "eventsTd";
    if (jsonEvents[i].fixingtime == null) {
      timeFixing.innerHTML = "-";
    } else {
      timeFixing.innerHTML = jsonEvents[i].fixingtime;
    }
    timeFixing.id = "fix" + i;
    eventsBodyRowNum.append(timeFixing);
  }
}

function loadNewInform_temp(eventTypesJson) {
  for (let i = 0; i < COUNT_HISTORY_LINES; i++) {
    let rowTemp = document.getElementById("eventsBodyRowNum" + i);

    let postNum = document.createElement("td");
    postNum.innerHTML = i;
    postNum.className = "eventsTd";
    postNum.id = "post" + i;
    rowTemp.append(postNum);

    let typeEvent = document.createElement("td");
    typeEvent.id = "type_event" + i;
    typeEvent.className = "typeEvent";
    typeEvent.innerHTML = "test";

    rowTemp.append(typeEvent);

    
    let descriptionAddButton = document.createElement("td");
    if (eventTypesJson[i].eventdescription == null) {
      descriptionAddButton.innerHTML = "-";
    } else {
      descriptionAddButton.innerHTML = eventTypesJson[i].eventdescription;
    }
    descriptionAddButton.id = "desc" + i;
    descriptionAddButton.className = "descriptionButton";
    rowTemp.append(descriptionAddButton);


    let timeDetection = document.createElement("td");

    if (timeDetection.innerHTML.indexOf("." > -1)) {
      timeDetection.innerHTML =
        eventTypesJson[i].detectingtime.split(".")[0].split("T")[0] +
        "\n" +
        eventTypesJson[i].detectingtime.split(".")[0].split("T")[1];
    } else {
      timeDetection.innerHTML = eventTypesJson[i].detectingtime;
    }

    timeDetection.className = "eventsTd";
    timeDetection.id = "detect" + i;
    rowTemp.append(timeDetection);

    let timeFixing = document.createElement("td");
    timeFixing.className = "eventsTd";
    if (eventTypesJson[i].fixingtime == null) {
      timeFixing.innerHTML = "-";
    } else {
      timeFixing.innerHTML = eventTypesJson[i].fixingtime;
    }
    timeFixing.id = "fix" + i;
    rowTemp.append(timeFixing);

  }
}

function clearButtons_temp() {
  $(".eventsTd").remove();
  $(".typeEvent").remove();
  $(".frameButtonDesc").remove();
  $(".editTd").remove();
  $(".descriptionButton").remove();
}

function checkMoves(jsonRes) {
  if (document.getElementsByClassName("eventDiv").length != 0) {
    clearButtons_temp();
    loadNewInform_temp(jsonRes);
  } else {
    show_events_temp(jsonRes);
  }
}

function openEditing(i, id_clicked) {
  localStorage.setItem(
    "post" + id_clicked,
    document.getElementById("post" + i).innerHTML
  );
  localStorage.setItem(
    "detect" + id_clicked,
    document.getElementById("detect" + i).innerHTML
  );
  localStorage.setItem(
    "fix" + id_clicked,
    document.getElementById("fix" + i).innerHTML
  );
  localStorage.setItem(
    "desc" + id_clicked,
    document.getElementById("desc" + i).innerHTML
  );

  window.name = "edit/" + id_clicked;

  window.location.href = window.name;
}

function wrap() {
  $.ajax({
    url: "http://127.0.0.1:8000/main/Events/?format=json",
    method: "get",
    dataType: "json",
    async: false,
    success: function (data) {

      console.log(new Date(data[0].detectingtime));

      let jsonRes = data.sort(function (a, b) {
        let dateA = new Date(a.detectingtime),
          dateB = new Date(b.detectingtime);
        return dateB - dateA;
      });

      console.log(jsonRes);
      checkMoves(jsonRes);
    },
  });
}
