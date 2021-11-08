const POSTS         = 14
const FETCH_URL     = "http://127.0.0.1:8000/main/ButtonsPosts/?format=json"
const RED_COLOR     = 1
const YELLOW_COLOR  = 2
const GREEN_COLOR   = 3


function loadBoard(jsonRes) {
    let monitoringDiv = document.createElement("div");
    monitoringDiv.id = "mondiv";
    monitoringDiv.className = "monitoringDiv";
    document.body.append(monitoringDiv);

    let monitoringTable = document.createElement("table");
    monitoringTable.className = "monitoring-table";
    monitoringDiv.append(monitoringTable);

    let monitoringTBody = document.createElement("tbody");
    monitoringTBody.className = "monitoringTBody";
    monitoringTable.append(monitoringTBody);

    let monitoringTr1 = document.createElement("tr");
    monitoringTr1.id = "monitoringTr1";
    monitoringTr1.className = "monitoringTr";
    monitoringTBody.append(monitoringTr1);
    let monitoringTr2 = document.createElement("tr");
    monitoringTr2.id = "monitoringTr2";
    monitoringTr2.className = "monitoringTr"
    monitoringTBody.append(monitoringTr2);
    let monitoringTr3 = document.createElement("tr");
    monitoringTr3.id = "monitoringTr3";
    monitoringTr3.className = "monitoringTr";
    monitoringTBody.append(monitoringTr3);

    for (let i = 0; i < POSTS; ++i) {
        let monitoringTdTop = document.createElement("td");
        monitoringTdTop.id = jsonRes[i].leftside + "_" + jsonRes[i].leftcolor + "_" + i + "t";
        monitoringTdTop.className = "accdient-registration-top";
        if (jsonRes[i].leftcolor == RED_COLOR) { monitoringTdTop.style = "background-color: #ff1f00" }
        else if (jsonRes[i].leftcolor == YELLOW_COLOR) { monitoringTdTop.style = "background-color: #ffff00" }
        else { monitoringTdTop.style = "background-color: #19ff19" };
        monitoringTr1.append(monitoringTdTop);

        let monitoringTdNumb = document.createElement("td");
        monitoringTdNumb.id = i;
        monitoringTdNumb.className = "post-nmb";
        monitoringTdNumb.innerHTML = i;
        monitoringTr2.append(monitoringTdNumb);

        let monitoringTdBottom = document.createElement("td");
        monitoringTdBottom.id = jsonRes[i].rightside + "_" + jsonRes[i].rightcolor + "_" + i + "b";
        monitoringTdBottom.className = "accdient-registration-bottom";
        if (jsonRes[i].rightcolor == RED_COLOR) { monitoringTdBottom.style = "background-color: #ff1f00" }
        else if (jsonRes[i].rightcolor == YELLOW_COLOR) { monitoringTdBottom.style = "background-color: #ffff00" }
        else { monitoringTdBottom.style = "background-color: #19ff19" };
        monitoringTr3.append(monitoringTdBottom);
    }
}


function loadNewInform(jsonRes) {
    for (let i = 0; i < POSTS; ++i) {
        let monitoringTdTop = document.createElement("td");
        monitoringTdTop.id = jsonRes[i].leftside + "_" + jsonRes[i].leftcolor + "_" + i + "t";
        monitoringTdTop.className = "accdient-registration-top";
        if (jsonRes[i].leftcolor == RED_COLOR) { monitoringTdTop.style = "background-color: #ff1f00" }
        else if (jsonRes[i].leftcolor == YELLOW_COLOR) { monitoringTdTop.style = "background-color: #ffff00" }
        else { monitoringTdTop.style = "background-color: #19ff19" };
        monitoringTr1.append(monitoringTdTop);

        let monitoringTdBottom = document.createElement("td");
        monitoringTdBottom.id = jsonRes[i].rightside + "_" + jsonRes[i].rightcolor + "_" + i + "b";
        monitoringTdBottom.className = "accdient-registration-bottom";
        if (jsonRes[i].rightcolor == RED_COLOR) { monitoringTdBottom.style = "background-color: #ff1f00" }
        else if (jsonRes[i].rightcolor == YELLOW_COLOR) { monitoringTdBottom.style = "background-color: #ffff00" }
        else { monitoringTdBottom.style = "background-color: #19ff19" };
        monitoringTr3.append(monitoringTdBottom);
    }
}


function clearButtons() {
    $('.accdient-registration-top').remove();
    $('.accdient-registration-bottom').remove();
}   


function checkMove(jsonRes) {
    if (document.getElementsByClassName("monitoringDiv").length != 0) {
        // Received a signal from the simulator -> else: the user updated the page
        clearButtons();
        loadNewInform(jsonRes);
    }
    else {
        loadBoard(jsonRes);
    }
}   


function update() {
    $.ajax({
        url: "http://127.0.0.1:8000/main/ButtonsPosts/?format=json",
        method: "get",
        dataType: "json",
        async: false,
        success: function(data) {
            let jsonRes = data.sort(((obj1, obj2) => obj1.post - obj2.post));
            checkMove(jsonRes);
        }
    });
}