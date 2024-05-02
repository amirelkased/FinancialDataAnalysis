/*document.getElementById("show").onclick = function () {
    let prediction = parseInt(document.getElementById("predictionx").value);
    if (prediction < 1 || prediction > 15 || isNaN(prediction)) {
        document.getElementById("warning").style.display = "block";
        document.getElementById("predictionx").value = "";
    }
    else {
        document.getElementById("predictionx").value = "";
        document.getElementById("warning").style.display = "none";
    }
}*/

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
const clickVote = document.getElementsByClassName("clickVote")[0];
clickVote.onclick = function () {
    voting.style.display = "block";
}

document.getElementsByClassName("fa-search")[0].onclick = function () {
    wrapper.classList.remove("active");
}

document.getElementsByClassName("humbg")[0].onclick = function () {
    document.getElementsByClassName("drop")[0].classList.toggle("view_humbg");
}

let up = document.getElementsByClassName("up")[0];
window.addEventListener("scroll", () => {
    if (document.body.scrollTop >= 250 || document.documentElement.scrollTop >= 250) {
        up.classList.remove("hide");
    } else {
        up.classList.add("hide");
    }
})
up.onclick = function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    voting.style.display = "none";
}
function select() {
    for (let i = 0; i < list.length; i++) {
        list[i].onclick = function () {
            for (let j = 0; j < list.length; j++) {
                list[j].classList.remove("select");
            }
            this.classList.add("select");
            window.localStorage.setItem("ele", this.getAttribute("data-index"))
            document.getElementById("img").src = this.children[0].src;
            document.getElementsByClassName("list")[0].classList.toggle("viewing");
        };
    }
}
select();