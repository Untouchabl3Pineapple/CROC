function wrap_edit(jsonData) {
    let info_div = document.createElement("div");
    let desc_div = document.createElement("div");
    let type_event_div = document.createElement("div");
    let buttons_div = document.createElement("div");

    type_event_div.className = "typeEventDiv";
    info_div.className = "infoDiv";
    desc_div.className = "descDiv";
    buttons_div.className = "buttonsDiv";



    document.body.append(info_div);
    document.body.append(desc_div);
    document.body.append(type_event_div);
    document.body.append(buttons_div);


    let infoTable = document.createElement("table");
    infoTable.className = "infoTable";
    info_div.append(infoTable);
  
    let infoHead = document.createElement("thead");
    infoHead.className = "infoHead";
    infoTable.append(infoHead);
  
    let infoRow = document.createElement("tr");
    infoHead.append(infoRow);

    let postHeadTd = document.createElement("td");
    postHeadTd.className = "infoHeadTd";
    let timeDetectHeadTd = document.createElement("td");
    timeDetectHeadTd.className = "infoHeadTd";
    let timeFixHeadTd = document.createElement("td");
    timeFixHeadTd.className = "infoHeadTd";

    postHeadTd.innerHTML = "№ Поста";
    timeDetectHeadTd.innerHTML = "Время фиксации";
    timeFixHeadTd.innerHTML = "Время устранения";

    infoRow.append(postHeadTd);
    infoRow.append(timeDetectHeadTd);
    infoRow.append(timeFixHeadTd);

    let infoBody = document.createElement("tbody");
    infoTable.append(infoBody);

    let infoBodyRow = document.createElement("tr");
    infoBody.append(infoBodyRow);

    let postTd = document.createElement("td");
    let timeDetectTd = document.createElement("td");
    let timeFixTd = document.createElement("td");
    postTd.className = "infoTd";
    timeDetectTd.className = "infoTd";
    timeFixTd.className = "infoTd";

    let hash = window.location.href.split("/")[6];
    postTd.innerHTML = localStorage.getItem("post" + hash);
    timeDetectTd.innerHTML = localStorage.getItem("detect" + hash);
    timeFixTd.innerHTML = localStorage.getItem("fix" + hash);

    infoBodyRow.append(postTd);
    infoBodyRow.append(timeDetectTd);
    infoBodyRow.append(timeFixTd);

    

    let descHead = document.createElement("span");
    descHead.className = "descHead";
    descHead.innerHTML = "Описание происшествия";

    let descInput = document.createElement("input");
    descInput.className = "descInput";

    if (localStorage.getItem("desc" + hash) != "-") {
      descInput.value = localStorage.getItem("desc" + hash);
    } else {
      descInput.value = "";
    }


    desc_div.append(descHead);
    desc_div.append(descInput);

    let typeHead = document.createElement("span");
    typeHead.innerHTML = "Тип происшествия";
    typeHead.className = "typeHeadSpan";

    let typeTable = document.createElement("table");
    typeTable.className = "typeTable";
    let typeBody = document.createElement("tbody");
    typeTable.append(typeBody);

    let active_button = "null";

    for (let i = 0; i < 2; i++) {      
      let typeRow = document.createElement("tr");
      typeBody.append(typeRow);
      for (let j = 0; j < 3; j++) {
        let typeTd = document.createElement("td");

        let tdButton = document.createElement("button");
        tdButton.className = "tdButton";
        tdButton.id = i * 3 + j;

        tdButton.onclick = function() {
          if (this.className == "tdButton") {
            this.className = "tdButtonActivated";
            for (let k = 0; k < 6; k++) {
              if (k.toString() != this.id) {
                document.getElementById(k.toString()).className = "tdButton";
                active_button = k;
              }
            }
          } else {
            this.className = "tdButton";
            active_button = "null";
          }
        }
        tdButton.innerHTML = tdButton.id;
        typeTd.append(tdButton);

      
        typeTd.className = "typeTd";
        typeRow.append(typeTd);
      }
    }

    type_event_div.append(typeHead);
    type_event_div.append(typeTable);


    let buttonSave = document.createElement("button");
    buttonSave.className = "buttonSave";
    buttonSave.innerHTML = "Сохранить";
    buttonSave.onclick = function() {
        save_info(descInput.value, hash, active_button);
    }

    let buttonCancel = document.createElement("button");
    buttonCancel.className = "buttonCancel";
    buttonCancel.innerHTML = "Отмена";

    buttonCancel.onclick = function() {
      cancel();
    }

    buttons_div.append(buttonCancel);
    buttons_div.append(buttonSave);


  }




wrap_edit();






function getCookie(name) {
    let cookieValue = null;

    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();

            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }

    return cookieValue;
}




function save_info(desc, uuid, active_button) {
    console.log(desc);
    console.log(uuid);

    const csrftoken = getCookie("csrftoken");
    let headers = {"X-CSRFToken": csrftoken}
    
    $.ajax({
        url: "http://127.0.0.1:8000/main/Events/" + uuid + "/?format=json",
        method: "get",
        dataType: "json",
        async: false,
        success: function(data){
            let kekw = {
                "id": uuid,
                "buttonevent": data.buttonevent,
                // "eventtype": active_button,  
                "detectingtime": data.detectingtime,
                "timeupdate": data.timeupdate,
                "eventdescription": desc,
            };
            let temp = JSON.stringify(kekw);
            $.ajax({
                url: "http://127.0.0.1:8000/main/Events/" + uuid + "/",
                data: temp,
                headers: headers,
                method: "put",
                contentType: "application/json",
                dataType: "json",
                async: false,
            });

            window.location.href = "http://127.0.0.1:8000/main/monitoring";
        }
    });
}


function cancel() {
    window.location.href = "http://127.0.0.1:8000/main/monitoring";
}