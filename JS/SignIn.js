const forms = document.getElementById("signInform");
let inputs = document.getElementsByClassName("inputs");
let error = document.getElementsByClassName("error");
// Retrieve flag value from local storage
let flag = JSON.parse(window.localStorage.getItem("flag")) || false;

// Function to update flag value in local storage
function updateFlag(value) {
    flag = value;
    window.localStorage.setItem("flag", JSON.stringify(value));
}
// Check flag value and update UI accordingly
if (flag === true) {
    document.getElementById("SinUp").classList.add("disableSignUp");
    document.getElementById("SinUp").classList.remove("x");
    document.getElementById("SinIn").classList.add("disableSignIn");
    document.getElementById("SignOut").classList.remove("disableSignOut");
    updateFlag(false);
}

forms.onsubmit = function (e) {
    // Reset count for every form submission
    let counts = 0;
    for (let x = 0; x < inputs.length; x++) {
        let inputValue = inputs[x].value.trim();
        if (inputValue !== '' && inputValue !== ' ') {
            if (inputs[x].classList.contains('user')) {
                let user = inputValue;
                if (user.match(/^[a-zA-Z0-9_\-]{3,}$/)) {
                    error[x].style.display = "none";
                } else {
                    displayError(x, 'Enter your User Name');
                    e.preventDefault();
                    return;
                }
            }
            // Validating password
            else if (inputs[x].classList.contains('password')) {
                let pass = inputValue;
                if (pass.length >= 10 && pass.match(/[0-9]/) && /[~`!#$%\^&*.+=\- _\[\]\\';,/{}|\\":<>\?]/.test(pass) && pass.match(/[A-Z]/) && pass.match(/[a-z]/)) {
                    error[x].style.display = "none";
                } else {
                    displayError(x, "Enter your Password");
                    e.preventDefault();
                    return;
                }
            }
            counts++;
        } else {
            displayError(x, 'This field is required');
            e.preventDefault();
            return;
        }
    }

    // If all conditions are met, submit the form
    if (counts === inputs.length) {
        prevents(event);
        updateFlag(true); // Update flag value to true
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

const apiUrl = 'http://localhost:9194/auth/login';
let tokens;
function prevents(event) {
    event.preventDefault();
    const formData = new FormData(forms);
    const data = Object.fromEntries(formData);
    const jsonData = JSON.stringify(data);
    function submitForms() {
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
                return response.json();
            })
            .then(data => {
                console.log('state:', data);
                if (data.status !== "success") {
                    alert('The User-Name or Password may be false');
                }
                else {
                    forms.submit();
                    tokens = data.token;
                    window.localStorage.setItem("Token", tokens);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    submitForms();
}