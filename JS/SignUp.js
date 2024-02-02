let form = document.getElementsByClassName("form")[0];
let inputs = document.getElementsByClassName("inputs");
let error = document.getElementsByClassName("error");
let count = 0;

form.onsubmit = function (e) {
    // Reset count for every form submission
    count = 0;

    for (let x = 0; x < inputs.length; x++) {
        let inputValue = inputs[x].value.trim();
        if (inputValue !== '' && inputValue !== ' ') {
            if (inputs[x].classList.contains('name')) {
                let name = inputValue;
                if (name.length >= 3 && name.match(/[a-zA-Z]/)) {
                    error[x].style.display = "none";
                } else {
                    e.preventDefault();
                    displayError(x, 'Enter your name');
                    return;
                }
            }
            else if (inputs[x].classList.contains('email')) {
                let emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/;
                if (emailPattern.test(inputValue) && inputValue.length >= 16) {
                    error[x].style.display = "none";
                } else {
                    displayError(x, 'Email should be username @gamil or yahoo.com');
                    e.preventDefault();
                    return;
                }
            }
            else if (inputs[x].classList.contains('user')) {
                let user = inputValue;
                if (user.length >= 7 && user.match(/[a-zA-Z]/) && user.match(/[0-9_.]/)) {
                    error[x].style.display = "none";
                } else {
                    displayError(x, 'Username should contain your name and 0:9 or _ or .');
                    e.preventDefault();
                    return;
                }
            }
            // Validating password
            else if (inputs[x].classList.contains('password')) {
                let pass = inputValue;
                if (pass.length >= 10 && pass.match(/[0-9]/) && /[~`!#$%\^&*+=\-._\[\]\\';,/{}|\\":<>\?]/.test(pass) && pass.match(/[A-Z]/) && pass.match(/[a-z]/)) {
                    error[x].style.display = "none";
                } else {
                    displayError(x, "Password must contain capital,small letters,numbers and special characters and the length shouldn't be shorter than 10");
                    e.preventDefault();
                    return;
                }
            }
            count++;
        } else {
            displayError(x, 'This feild is required');
            e.preventDefault();
            return;
        }
    }

    // If all conditions are met, submit the form
    if (count === inputs.length) {
        document.getElementsByClassName("form")[0].submit();
    }
};

function displayError(index, message) {
    // Clear errors for all fields
    for (let y = 0; y < inputs.length; y++) {
        error[y].style.display = "none";
    }
    // Display error for the specific field
    error[index].style.display = "block";
    // Display the error message
    error[index].textContent = message;

}
