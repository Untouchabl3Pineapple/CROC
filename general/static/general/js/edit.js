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
    postTd.innerHTML = "test post";
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

    for (let i = 0; i < 2; i++) {
      let typeRow = document.createElement("tr");
      typeBody.append(typeRow);
      for (let j = 0; j < 3; j++) {
        let typeTd = document.createElement("td");

        let tdButton = document.createElement("button");
        tdButton.className = "tdButton";
        tdButton.innerHTML = "i + j";
        typeTd.append(tdButton);

      
        typeTd.className = "typeTd";
        // TODO
        // typeTd.innerHTML = i + ";" + j;
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



    // // let post1 = document.createElement("span");
    // // post1.innerHTML = localStorage.getItem("post");

    // // let type = document.createElement("span");
    // // type.innerHTML = localStorage.getItem("type_event");
    // let detect = document.createElement("span");
    // detect.innerHTML = localStorage.getItem("time_detect");
    // let fix = document.createElement("span");
    // fix.innerHTML = localStorage.getItem("time_fixing")

    // info_div.append(jsonData.detectingtime);

    // let desc_head = document.createElement("span");
    // desc_head.innerHTML = "Описание происшествия";

    // let desc_input = document.createElement("input");
    // desc_input.innerHTML = desc.innerHTML;

    // desc_div.append(desc_head);
    // desc_div.append(desc_input);

    // let type_event_head = document.createElement("span");
    // type_event_div.innerHTML = "Тип происшествия";

    // let typeEvent = document.createElement("select");   

    // for (let i = 0; i < 3; i++) {
    //   let option = document.createElement("option");
    //   option.value = i;
    //   option.text = i;
    //   option.id = "option" + i;
    //   typeEvent.append(option);
    // }

    // // type_event_div.append(type_event_head);
    // // type_event_div.append(typeEvent);


    // let save_button = document.createElement("button");
    // save_button.innerHTML = "Сохранить";
    // save_button.onclick = save_info;

    // let delete_button = document.createElement("button");
    // delete_button.innerHTML = "Удалить";
    // delete_button.onclick = delete_info;


    // document.body.append(save_button);
    // document.body.append(delete_button);
  }






wrap_edit();



  function save_info() {
    // const csrftoken = getCookie("csrftoken");
    // console.log(csrftoken);
    
    // let descJSON = {
    //     "eventdescription": ,
    //     "number": buttonNumber,
    // };

    // let headers = {"X-CSRFToken": csrftoken}
    // let temp = JSON.stringify(dbJson);
    // console.log(temp);

    // $.ajax({
    //     url: "http://127.0.0.1:8000/main/Events/",
    //     data: temp,
    //     headers: headers,
    //     method: "p",
    //     contentType: "application/json",
    //     dataType: "json",
    //     async: false,
    //     success: function(data){
    //         console.log(data);
    //     }
    // });
  }


  function delete_info() {

  }