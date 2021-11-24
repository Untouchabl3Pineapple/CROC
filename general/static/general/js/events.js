const HEADS = 6;
const HEAD = [
  "№ Поста",
  "Тип происшествия",
  "Описание",
  "Время фиксации",
  "Время устранения",
  "Редактор",
];
const COLUMN_WIDTH = [
  "width: 10%",
  "width: 20%",
  "width: 40%",
  "width: 10%",
  "width: 10%",
  "width: 10%",
];
const COUNT_HISTORY_LINES = 10;

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let secs = date.getSeconds();

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (secs < 10) {
    secs = "0" + secs;
  }

  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getDate() +
    "\n" +
    hours +
    ":" +
    minutes +
    ":" +
    secs
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
    console.log(jsonEvents[i].buttonevent);
    $.getJSON(jsonEvents[i].buttonevent, function (data) {
      postNum.innerHTML = data.number;
    });

    postNum.className = "eventsTd";
    postNum.id = "post" + i;
    eventsBodyRowNum.append(postNum);

    let typeEvent = document.createElement("td");
    typeEvent.id = "type_event" + i;
    typeEvent.className = "typeEvent";

    if (jsonEvents[i].eventtype != null) {
      $.getJSON(jsonEvents[i].eventtype, function (data) {
        typeEvent.innerHTML = data.eventtype.slice(0, 23);
      });
    } else {
      typeEvent.innerHTML = "-";
    }

    eventsBodyRowNum.append(typeEvent);

    let descriptionAddButton = document.createElement("td");

    if (jsonEvents[i].eventdescription == null) {
      descriptionAddButton.innerHTML = "-";
    } else {
      descriptionAddButton.innerHTML = jsonEvents[i].eventdescription.slice(
        0,
        62
      );
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

    let editTd = document.createElement("td");
    editTd.className = "editTd";
    let editButton = document.createElement("button");
    editButton.id = "edit" + i;
    editButton.className = "far fa-edit";
    editButton.style =
      "cursor: pointer; font-size:24px; color:blue; width:60px; height:30px; background-color:white; border:none";
    editButton.onclick = function () {
      openEditing(i, jsonEvents[i].id);
    };
    editTd.append(editButton);
    eventsBodyRowNum.append(editTd);
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
      $.getJSON(eventTypesJson[i].eventtype, function (data) {
        typeEvent.innerHTML = data.eventtype.slice(0, 23);
      });
    } else {
      typeEvent.innerHTML = "-";
    }

    rowTemp.append(typeEvent);

    let descriptionAddButton = document.createElement("td");
    if (eventTypesJson[i].eventdescription == null) {
      descriptionAddButton.innerHTML = "-";
    } else {
      descriptionAddButton.innerHTML = eventTypesJson[i].eventdescription.slice(
        0,
        62
      );
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

    let editTd = document.createElement("td");

    editTd.className = "editTd";
    let editButton = document.createElement("button");
    editButton.id = "edit" + i;
    editButton.className = "far fa-edit";
    editButton.style =
      "font-size:24px; color:blue; width:60px; height:30px; background-color:white; border:none";
    editButton.onclick = function () {
      openEditing(i, eventTypesJson[i].id);
    };
    editTd.append(editButton);

    rowTemp.append(editTd);
  }
}

function clearButtons_temp() {
  $(".eventsTd").remove();
  $(".typeEvent").remove();
  $(".frameButtonDesc").remove();
  $(".editTd").remove();
  $(".descriptionButton").remove();
  $(".far fa-edit").remove();
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
  localStorage.setItem(
    "type" + id_clicked,
    document.getElementById("type_event" + i).innerHTML
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
      //   console.log(new Date(data[0].detectingtime));

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
