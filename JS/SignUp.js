document.getElementById("button").onclick = function () {
    let pass = document.getElementsByClassName("password")[0];
    if (pass.length !== 10) {
        document.getElementById("error").style.display = "block";
        console.log("ok");
    }
    else {
        document.getElementById("error").style.display = "none";
    }
}