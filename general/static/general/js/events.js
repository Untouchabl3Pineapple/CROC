// import {wrap_edit} from './edit.js';


const HEADS = 5
const HEAD = ["№ Поста", "Тип происшествия", "Описание", "Время фиксации", "Время устранения"];
const COLUMN_WIDTH = ["width: 10%", "width: 20%", "width: 40%", "width: 15%", "width: 15%"]
const COUNT_HISTORY_LINES = 15



function show_events(jsonEvents) {
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
    eventsHeadNum.className = "eventsHeadTd";
    eventsHeadNum.style = COLUMN_WIDTH[i];
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
    success: function(data) {
      eventTypesJson = data
    }
  });

  for (let i = 0; i < COUNT_HISTORY_LINES; i++) {
    let eventsBodyRowNum = document.createElement("tr");
    eventsBodyRowNum.id =  "eventsBodyRowNum" + i;
    eventsTBody.append(eventsBodyRowNum);

    if (i % 2 == 0) {
      eventsBodyRowNum.className = "eventsBodyRowEven";
    } else {
      eventsBodyRowNum.className = "eventsBodyRowOdd";
    }

    let postNum = document.createElement("td");
    postNum.innerHTML = i;
    postNum.className = "eventsTd";
    postNum.id = "post" + i;
    eventsBodyRowNum.append(postNum);

    let typeEvent = document.createElement("td");   
    typeEvent.id = "type_event" + i; 
    // if (i % 2 == 0) {
      // typeEvent.className = "typeEventEven";
    // } else {
    typeEvent.className = "typeEvent";
    typeEvent.innerHTML = eventTypesJson[0].eventtype;
    // }
    // let frameEvent = document.createElement("td");
    // frameEvent.append(typeEvent);

    // for (let i = 0; i < eventTypesJson.length; i++) {
      // let option = document.createElement("option");
      // option.value = eventTypesJson[i].eventtype;
      // option.text = eventTypesJson[i].eventtype;
      // option.id = "option" + i;
      // typeEvent.append(option);
    // }
    eventsBodyRowNum.append(typeEvent);

    let descriptionValue = document.createElement("input");
    let descriptionAddButton = document.createElement("button");
    descriptionAddButton.innerHTML = jsonEvents[i].eventdescription;
    descriptionAddButton.innerHTML = "Test description only";
    descriptionAddButton.id = "desc" + i;
    if (i % 2 == 0) {
      descriptionAddButton.className = "descriptionButtonEven";
    } else {
      descriptionAddButton.className = "descriptionButton";
    }

    descriptionAddButton.onclick = function() {openEditing(jsonEvents[i].id)};

    let frameButton = document.createElement("td");
    frameButton.append(descriptionAddButton);
    eventsBodyRowNum.append(frameButton);

    let timeDetection = document.createElement("td");
    timeDetection.innerHTML = jsonEvents[i].detectingtime;
    timeDetection.className = "eventsTd";
    timeDetection.id = "detect" + i;
    eventsBodyRowNum.append(timeDetection);

    let timeFixing = document.createElement("td");
    timeFixing.innerHTML = jsonEvents[i].fixingtime;
    timeFixing.className = "eventsTd";
    timeFixing.id = "fix" + i;
    eventsBodyRowNum.append(timeFixing);
  }
}

function wrap() {
  $.ajax({
    url: "http://127.0.0.1:8000/main/Events/?format=json",
    method: "get",
    dataType: "json",
    async: false,
    success: function(data){
        show_events(data);
    }
  });
}

wrap();



function openEditing(id_clicked) {
  localStorage.setItem("id", id_clicked);
  document.location.href = "edit";
 
  // $.ajax({
  //       url: "http://127.0.0.1:8000/main/Events",
  //       method: "get",
  //       dataType : "json",
  //       async: false, 
  //       // data: {  
  //         // id : id_clicked
  //       // },
  //       success: function(data) {
  //         for (let i = 0; i < data.length; i++) {
  //           if (data[i].id == localStorage.getItem("id")) {
  //             // localStorage.setItem("post", data[i].);
  //             // // localStorage.setItem("type_event",  );
  //             // let desc = document.getElementById("desc" + row_num).innerHTML;
  //             // let time_detect = document.getElementById("detect" + row_num).innerHTML;
  //             // let time_fixing = document.getElementById("fix" + row_num).innerHTML;
  //             // localStorage.setItem("desc", data[i].eventdescription);
  //             localStorage.setItem("time_detect", data[i].detectingtime);
  //             localStorage.setItem("time_fixing", data[i].fixingtime);       
  //             document.location.href = "edit";
  //           }
  //           break;
  //         }
  //       },
  //     });

//   let post = document.getElementById("post" + row_num).innerHTML;
//   let type_event = document.getElementById("type_event" + row_num).innerHTML;
//   let desc = document.getElementById("desc" + row_num).innerHTML;
//   let time_detect = document.getElementById("detect" + row_num).innerHTML;
//   let time_fixing = document.getElementById("fix" + row_num).innerHTML;

  // wrap_edit()
  // newWindow = window.open("", null, "left=300,top=500,height=200,width=400,status=yes,toolbar=no,menubar=no,location=no");  
  
  // let descInput = document.createElement("input");
  // descInput.className = "descInput";

  // let descInputButton = document.createElement("button");
  // descInputButton.onclick = setDescription;
  // descInputButton.className = "descInputButton";

  // newWindow.append(descInput);
  // newWindow.append(descInputButton);
}


