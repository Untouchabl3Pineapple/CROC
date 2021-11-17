const HEADS = 5;
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

function formatDate(date) {
  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getDate() +
    "\n" +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds()
  );
}

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

    if (jsonEvents[i].eventtype != null) {
      $.getJSON(jsonEvents[i].eventtype, function(data) {
        typeEvent.innerHTML = data.eventtype;   
      });
    } else {
      typeEvent.innerHTML = "-";
    }

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

    let detect = new Date(jsonEvents[i].detectingtime);
    let res_dect = new Date(
      detect.getTime() - detect.getTimezoneOffset() * 60 * 1000
    );

    timeDetection.innerHTML = formatDate(res_dect);

    timeDetection.className = "eventsTd";
    timeDetection.id = "detect" + i;
    eventsBodyRowNum.append(timeDetection);

    let timeFixing = document.createElement("td");
    timeFixing.className = "eventsTd";
    if (jsonEvents[i].fixingtime == null) {
      timeFixing.innerHTML = "-";
    } else {
      let fixing = new Date(jsonEvents[i].fixingtime);
      let res_fixing = new Date(
        fixing.getTime() - fixing.getTimezoneOffset() * 60 * 1000
      );

      timeFixing.innerHTML = formatDate(res_fixing);
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

    if (eventTypesJson[i].eventtype != null) {
      $.getJSON(eventTypesJson[i].eventtype, function(data) {
        typeEvent.innerHTML = data.eventtype;   
      });
    } else {
      typeEvent.innerHTML = "-";
    }

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

    let detect = new Date(eventTypesJson[i].detectingtime);
    let res_dect = new Date(
      detect.getTime() - detect.getTimezoneOffset() * 60 * 1000
    );

    timeDetection.innerHTML = formatDate(res_dect);

    timeDetection.className = "eventsTd";
    timeDetection.id = "detect" + i;
    rowTemp.append(timeDetection);

    let timeFixing = document.createElement("td");
    if (eventTypesJson[i].fixingtime == null) {
      timeFixing.innerHTML = "-";
    } else {
      let fixing = new Date(eventTypesJson[i].fixingtime);
      let res_fixing = new Date(
        fixing.getTime() - fixing.getTimezoneOffset() * 60 * 1000
      );

      timeFixing.innerHTML = formatDate(res_fixing);
    }

    timeFixing.className = "eventsTd";
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
    async: true,
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
