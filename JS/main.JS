document.getElementById("show").onclick = function () {
    let prediction = parseInt(document.getElementById("predictionx").value);
    if (prediction < 1 || prediction > 15 || isNaN(prediction)) {
        document.getElementById("warning").style.display = "block";
        document.getElementById("predictionx").value = "";
    }
    else {
        document.getElementById("predictionx").value = "";
        document.getElementById("warning").style.display = "none";
    }
}
/*
document.getElementById("predictiony").onkeypress = function (ev) {
    if (ev.keyCode == 13) {
        document.getElementById("predictiony").value = "";
    }
}
document.getElementsByClassName("on")[1].onclick = function () {
    document.getElementById("predictiony").value = "";
}
document.getElementsByClassName("off")[0].onclick = function () {
    document.getElementById("predictiony").value = "";
}
*/
document.getElementsByClassName("fa-search")[0].onclick = function () {
    wrapper.classList.remove("active");
}
document.getElementsByClassName("humbg")[0].onclick = function () {
    document.getElementsByClassName("drop")[0].classList.toggle("view_humbg");
}
