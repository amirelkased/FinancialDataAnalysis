const form = document.getElementById("signUpform");
const inputs = document.getElementsByClassName("inputs");
const error = document.getElementsByClassName("error");
let count = 0;
let send = 0;

form.onsubmit = function (e) {
    // Reset count for every form submission
    count = 0;

    for (let x = 0; x < inputs.length; x++) {
        let inputValue = inputs[x].value.trim();
        if (inputValue !== '' && inputValue !== ' ') {
            if (inputs[x].classList.contains('name')) {
                let name = inputValue;
                if (name.length >= 3 && name.match(/^[a-zA-Z]+$/)) {
                    error[x].style.display = "none";
                } else {
                    e.preventDefault();
                    displayError(x, 'Enter your name');
                    return;
                }
            }
            else if (inputs[x].classList.contains('email')) {
                let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (emailPattern.test(inputValue)) {
                    error[x].style.display = "none";
                } else {
                    displayError(x, 'Enter valid E-mail');
                    e.preventDefault();
                    return;
                }
            }
            else if (inputs[x].classList.contains('user')) {
                let user = inputValue;
                if (user.match(/^[a-zA-Z0-9_\-]{3,}$/)) {
                    error[x].style.display = "none";
                } else {
                    displayError(x, 'Username should contain characters and may have numbers, _ or -');
                    e.preventDefault();
                    return;
                }
            }
            // Validating password
            else if (inputs[x].classList.contains('password')) {
                let pass = inputValue;
                if (pass.length >= 8 && pass.match(/[0-9]/) && /[~`!#$%\^&*+=\-._\[\]\\';,/{}|\\":<>\?]/.test(pass) && pass.match(/[A-Z]/) && pass.match(/[a-z]/)) {
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
        prevent(event);
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

const apiUrl = 'http://localhost:8088/api/v1/auth/register';
function prevent(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const jsonData = JSON.stringify(data);
    function submitForm() {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: jsonData,
        };
        fetch(apiUrl, requestOptions)
            .then(response => {
                console.log(response.status);
                if (response.status === 202) {
                    window.location.href="Activation.html";
                }
                else {
                    alert('The E-mail is used before');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    submitForm();
}