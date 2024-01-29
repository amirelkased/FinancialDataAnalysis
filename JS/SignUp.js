let form = document.getElementsByClassName("form")[0];
let inputs = document.getElementsByClassName("inputs");
let error = document.getElementsByClassName("error");
let button = document.getElementById("button");
let count = 0;
form.onsubmit = function x(e) {
    let pass = document.getElementsByClassName("password")[0].value;
    for (let x = 0; x < inputs.length; x++) {
        if (inputs[x].value !== '' && inputs[x].value !== ' ' && pass.length >= 10 && pass.match(/[0-9]/i) && /[_$]/g.test(pass) && pass.match(/[A-Z]/) && pass.match(/[a-z]/) ) {
            error[x].style.display = "none";
        }
        else {
            for (let y = 0; y < inputs.length; y++) {
                if (inputs[y].value !== '' && inputs[y].value !== ' ')
                    error[y].style.display = "none";
            }
            error[x].style.display = "block";
            e.preventDefault();
            window.history.back();
        }
        if (inputs[x].value !== '' && inputs[x].value !== ' ') {
            count++;
        }
    }
}
if (count === inputs.length) {
    document.getElementsByClassName("form")[0].submit();
}