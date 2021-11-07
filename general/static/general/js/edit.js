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

    // TODO 
    // postTd.innerHTML = "test post";
    postTd.innerHTML = localStorage.getItem("post");
    timeDetectTd.innerHTML = "test time detect";
    timeFixTd.innerHTML = "time fix test";

    infoBodyRow.append(postTd);
    infoBodyRow.append(timeDetectTd);
    infoBodyRow.append(timeFixTd);



    let descHead = document.createElement("span");
    descHead.className = "descHead";
    descHead.innerHTML = "Описание происшествия";

    let descInput = document.createElement("input");
    descInput.className = "descInput";

    desc_div.append(descHead);
    desc_div.append(descInput);



    let typeHead = document.createElement("span");
    typeHead.innerHTML = "Тип происшествия";
    typeHead.className = "typeHeadSpan";

    let typeTable = document.createElement("table");
    typeTable.className = "typeTable";
    let typeBody = document.createElement("tbody");
    typeTable.append(typeBody);

    for (let i = 0; i < 2; i++) {      let typeRow = document.createElement("tr");
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
              }
            }
          } else {
            this.className = "tdButton";
          }
        }
        tdButton.innerHTML = tdButton.id;
        typeTd.append(tdButton);

      
        typeTd.className = "typeTd";
        // TODO
        typeRow.append(typeTd);
      }
    }

    type_event_div.append(typeHead);
    type_event_div.append(typeTable);


    let buttonSave = document.createElement("button");
    buttonSave.className = "buttonSave";
    buttonSave.innerHTML = "Сохранить";

    let buttonCancel = document.createElement("button");
    buttonCancel.className = "buttonCancel";
    buttonCancel.innerHTML = "Отмена";

    buttons_div.append(buttonCancel);
    buttons_div.append(buttonSave);


  }






wrap_edit();







function save_info() {

}


function delete_info() {

}