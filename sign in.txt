const forms = document.getElementById("signInform");
let inputs = document.getElementsByClassName("inputs");
let error = document.getElementsByClassName("error");
// Retrieve flag value from local storage
let flag = JSON.parse(window.localStorage.getItem("flag")) || false;

// Function to update flag value in local storage
function updateFlag(value) {
    flag = value;
    window.localStorage.setItem("flag", JSON.stringify(value)); // Fixed typo here
}

// Check flag value and update UI accordingly
if (flag === true) {
    document.getElementById("SinUp").classList.add("disableSignUp");
    document.getElementById("SinUp").classList.remove("x");
    document.getElementById("SinIn").classList.add("disableSignIn");
    document.getElementById("SignOut").classList.remove("disableSignOut");
    //updateFlag(false);
}

forms.onsubmit = function (e) {
    // Reset count for every form submission
    let counts = 0;
    for (let x = 0; x < inputs.length; x++) {
        let inputValue = inputs[x].value.trim();
        if (inputValue !== '' && inputValue !== ' ') {
            if (inputs[x].classList.contains('email')) {
                let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (emailPattern.test(inputValue)) {
                    error[x].style.display = "none";
                } else {
                    displayError(x, 'Enter valid E-mail');
                    e.preventDefault();
                    return;
                }
            }
            // Validating password
            else if (inputs[x].classList.contains('password')) {
                let pass = inputValue;
                if (pass.length >= 8 && pass.match(/[0-9]/) && /[~`!#$%\^&*.+=\- _\[\]\\';,/{}|\\":<>\?]/.test(pass) && pass.match(/[A-Z]/) && pass.match(/[a-z]/)) {
                    error[x].style.display = "none";
                } else {
                    displayError(x, "Enter your Password");
                    e.preventDefault();
                    return;
                }
            }
            counts++;
            console.log(counts);
        } else {
            displayError(x, 'This field is required');
            e.preventDefault();
            return;
        }
    }

    // If all conditions are met, submit the form
    if (counts === 2) {
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

const apiUrl = 'http://localhost:8088/api/v1/auth/authenticate';
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
                console.log(response);
                if (response.status === 200) {
                    return response.json(); // Parse response body as JSON
                } else {
                    throw new Error('Failed to authenticate'); // Throw error for non-200 status
                }
            })
            .then(data => {
                tokens = data.token;
                console.log("token", tokens);
                window.localStorage.setItem("Token", tokens);
                updateFlag(true); // Update flag after successful authentication
                forms.submit(); // Submit the form after flag is updated
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Email or Password may be false');
            });
    }

    submitForms();
}