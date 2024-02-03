let form = document.getElementsByClassName("form")[0];
let inputs = document.getElementsByClassName("inputs");
let error = document.getElementsByClassName("error");

// Retrieve flag value from local storage
let flag = JSON.parse(window.localStorage.getItem("flag")) || false;

// Function to update flag value in local storage
function updateFlag(value) {
    flag = value;
    window.localStorage.setItem("flag", JSON.stringify(value));
}
console.log(flag);
if (window.location.href === "file:///E:/Maryam/%D9%81%D8%B1%D9%82%D8%A9%20%D8%B1%D8%A7%D8%A8%D8%B9%D8%A9/Graduation%20Project/signIn.html" || window.location.href === "file:///E:/Maryam/%D9%81%D8%B1%D9%82%D8%A9%20%D8%B1%D8%A7%D8%A8%D8%B9%D8%A9/Graduation%20Project/signIn.html?") {
    form.onsubmit = function (e) {
        // Reset count for every form submission
        let count = 0;
        for (let x = 0; x < inputs.length; x++) {
            let inputValue = inputs[x].value.trim();
            if (inputValue !== '' && inputValue !== ' ') {
                if (inputs[x].classList.contains('user')) {
                    let user = inputValue;
                    if (user.length >= 7 && user.match(/[a-zA-Z]/) && user.match(/[0-9_.]/)) {
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
                count++;
            } else {
                displayError(x, 'This field is required');
                e.preventDefault();
                return;
            }
        }

        // If all conditions are met, submit the form
        if (count === inputs.length) {
            document.getElementsByClassName("form")[0].submit();
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
}

// Check flag value and update UI accordingly
if (flag === true) {
    document.getElementById("SinUp").classList.add("disableSignUp");
    document.getElementById("SinUp").classList.remove("x");
    document.getElementById("SinIn").classList.add("disableSignIn");
    document.getElementById("SignOut").classList.remove("disableSignOut");
    console.log("ok");
    updateFlag(false);
    console.log(flag);
}
