let count_selected = 0;
let tJsonLen = 0;
let uuid_delete_td_array = [];


function make_page(types_json) {
    tJsonLen = types_json.length;
    let add_div = document.createElement("div");
    let types_div = document.createElement("div");

    add_div.className = "add_div";
    add_div.id = "add_div";
    types_div.className = "types_div";

    let button_add = document.createElement("button");
    button_add.className = "add_button";
    button_add.innerHTML = "Добавить";
    button_add.id = "add_button";
    button_add.onclick = function() {
        add_event(types_json.length);
    }
    add_div.append(button_add);


    let typesTable = document.createElement("table");
    typesTable.className = "typesTable";
    typesTable.id = "typesTable";
    types_div.append(typesTable);

    let typeHead = document.createElement("thead");
    typeHead.className = "typesHead";
    typesTable.append(typeHead);

    let typeRow = document.createElement("tr");
    typeRow.className = "typeHeadRow";
    typeHead.append(typeRow);

    let typeName = document.createElement("td");
    typeName.className = "typesHeadTd";  
    typeName.innerHTML = "Тип происшествия";
    typeRow.append(typeName);


    let typesBody = document.createElement("tbody");
    typesBody.id = "typesBody";
    typesTable.append(typesBody);

    for (let i = 0; i < types_json.length; i++) {
        let typesRow = document.createElement("tr");
        typesRow.className = "typeBodyRow";
        typesRow.id = "row=" + types_json[i].id;

        let typeTd = document.createElement("td");
        typeTd.id = types_json[i].id;
        typeTd.className = "typesTd";
        typeTd.innerHTML = types_json[i].eventtype;
        typeTd.addEventListener("click", function() {
            onRowClicked(this);
        });

        typesRow.append(typeTd);
        typesBody.append(typesRow);
    }

    document.body.append(add_div);
    document.body.append(types_div);
  
}
  

function wrap_types() {
    let types_json;
    $.ajax({
        url: "http://127.0.0.1:8000/main/EventsTypes/?format=json",
        method: "get",
        dataType: "json",
        async: false,
        success: function (temp) {
            types_json = temp;
            make_page(types_json);
        },
    });
}


wrap_types();


function add_event(i) {    
    let plus_button = document.createElement("button");
    let input_type = document.createElement("input");

    plus_button.className = "fas fa-plus";
    plus_button.style = "cursor:pointer; font-size:30px; color:#3CB371; height:50px; border:none; background-color:white;margin-left:4%";
    plus_button.onclick = function() {
        plus_type(input_type.value, i);
    }
    
    input_type.className = "input_type";
    input_type.id = "input_type";

    $(".add_button").remove();

    let add_div = document.getElementById("add_div");
    add_div.style = "width:80%; margin-left:10%; border:2px solid black; border-radius:20px;"
    add_div.append(plus_button);
    add_div.append(input_type);

    input_type.value = "Введите тип происшествия";
    input_type.focus();
    input_type.select();
}




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


function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}
  

function plus_type(type, i) {
    new_uuid = uuidv4();


    let body = document.getElementById("typesBody");
    let typesRow = document.createElement("tr");
    typesRow.className = "typeBodyRow";
    typesRow.id = "row=" + new_uuid;

    body.append(typesRow);

    let typeTd = document.createElement("td");
    typeTd.id = new_uuid;
    typeTd.className = "typesTd";
    typeTd.innerHTML = type;
    typeTd.addEventListener("click", function() {
        onRowClicked(this);
    });

    typesRow.append(typeTd);

    let input_type = document.getElementById("input_type");
    input_type.value = "Введите тип происшествия";
    input_type.focus();
    input_type.select();



    const csrftoken = getCookie("csrftoken");

    let dbJson = {
        id: new_uuid,
        eventtype: type,
    };

    let headers = { "X-CSRFToken": csrftoken };
    let temp = JSON.stringify(dbJson);
    console.log(temp);

    $.ajax({
        url: "http://127.0.0.1:8000/main/EventsTypes/",
        data: temp,
        headers: headers,
        method: "post",
        contentType: "application/json",
        dataType: "json",
        async: false,
    });
}




function onRowClicked(td) {
    console.log(td.id);

    if (td.className == "typeTdActivated") {
        td.className = "typesTd";
        count_selected--;
        let item_index = uuid_delete_td_array.indexOf(td.id);
        uuid_delete_td_array.splice(item_index, 1);
    } else {
        td.className = "typeTdActivated";
        uuid_delete_td_array.push(td.id);
        count_selected++;
    }

    $(".add_button").remove();
    $(".fas.fa-plus").remove();
    $(".input_type").remove();
    let add_div = document.getElementById("add_div");
    add_div.className = "add_div";
    add_div.style = "";

    if (!document.getElementById("del_button")) {
        let del_button = document.createElement("button");
        del_button.id = "del_button";
        del_button.innerHTML = "Удалить";
        del_button.className = "del_button";
        del_button.onclick = function() {
            del_events();
        }

        let add_div = document.getElementById("add_div");
        add_div.className = "add_div";
        add_div.append(del_button);
    }

    if (count_selected == 0) {
        make_add_button();
    }
}



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



function del_events() {
    const csrftoken = getCookie("csrftoken");
    let headers = { "X-CSRFToken": csrftoken };
    
    if (count_selected == 0) {
        return;
    }

    let types_table = document.getElementById("typesTable");

    for (let i = 0; i < count_selected; i++) {
        console.log("id = ", uuid_delete_td_array[i]);
        let row = document.getElementById("row=" + uuid_delete_td_array[i]);
        console.log(row);
        for (let j = 0; j < types_table.rows.length; j++) {
            if (types_table.rows[j] == row) {
                console.log(j);
                types_table.deleteRow(j);
                break;
            }
        }
    }
    count_selected = 0;
    uuid_delete_td_array = [];

    make_add_button();

    $.ajax({
        url: "http://127.0.0.1:8000/main/del_type/" + uuid + "/",
        headers: headers,
        type: "DELETE",
        success: function() {
            console.log("SUCCESS DELETE TYPE EVENT");
        }
      });
}


function make_add_button() {
    $(".del_button").remove();
    let button_add = document.createElement("button");
    button_add.className = "add_button";
    button_add.innerHTML = "Добавить";
    button_add.id = "add_button";
    button_add.onclick = function() {
        add_event(tJsonLen);
    }
    add_div.append(button_add);
}