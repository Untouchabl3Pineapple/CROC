function wrap_edit() {
    let info_div = document.createElement("div");
    let desc_div = document.createElement("div");
    let type_event_div = document.createElement("div");

    document.body.append(info_div);
    document.body.append(desc_div);
    document.body.append(type_event_div);
   

    let post1 = document.createElement("span");
    post1.innerHTML = localStorage.getItem("post");
    let desc = document.createElement("span");
    desc.innerHTML = localStorage.getItem("desc");
    let type = document.createElement("span");
    type.innerHTML = localStorage.getItem("type_event");
    let detect = document.createElement("span");
    detect.innerHTML = localStorage.getItem("time_detect");
    let fix = document.createElement("span");
    fix.innerHTML = localStorage.getItem("time_fixing")

    info_div.append(post1);
    info_div.append(detect);
    info_div.append(fix);

    let desc_head = document.createElement("span");
    desc_head.innerHTML = "Описание происшествия";

    let desc_input = document.createElement("input");
    desc_input.innerHTML = desc.innerHTML;

    desc_div.append(desc_head);
    desc_div.append(desc_input);

    let type_event_head = document.createElement("span");
    type_event_div.innerHTML = "Тип происшествия";

    let typeEvent = document.createElement("select");   

    for (let i = 0; i < 3; i++) {
      let option = document.createElement("option");
      option.value = i;
      option.text = i;
      option.id = "option" + i;
      typeEvent.append(option);
    }

    type_event_div.append(type_event_head);
    type_event_div.append(typeEvent);


    let save_button = document.createElement("button");
    save_button.innerHTML = "Сохранить";
    save_button.onclick = save_info;

    let delete_button = document.createElement("button");
    delete_button.innerHTML = "Удалить";
    delete_button.onclick = delete_info;


    document.body.append(save_button);
    document.body.append(delete_button);
  }

  wrap_edit();



  function save_info() {
    const csrftoken = getCookie("csrftoken");
    console.log(csrftoken);
    
    let descJSON = {
        "eventdescription": ,
        "number": buttonNumber,
    };

    let headers = {"X-CSRFToken": csrftoken}
    let temp = JSON.stringify(dbJson);
    console.log(temp);

    $.ajax({
        url: "http://127.0.0.1:8000/main/Events/",
        data: temp,
        headers: headers,
        method: "p",
        contentType: "application/json",
        dataType: "json",
        async: false,
        success: function(data){
            console.log(data);
        }
    });
  }


  function delete_info() {

  }