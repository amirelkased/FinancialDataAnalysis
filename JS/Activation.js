// Get activation page form
var activationPage = document.getElementsByClassName("box")[0];
// Get all input elements with class 'code'
var items = document.querySelectorAll('.code');
var lastTabIndex = 6;
var backSpaceCode = 12;
var token = "";

// Add event listeners to input elements
items.forEach(function (item) { // when focus on feild delete every thing on this feild
    item.addEventListener('focus', function (e) {
        e.target.value = '';
    });

    item.addEventListener('input', function (e) {
        // Update the token variable with the input value
        token = ""; // Clear token
        items.forEach(function (input) {
            token += input.value;
        });
        console.log(token);
        if (token.length === items.length) {
            submitAndActivateCode(token);
            console.log("token",token);
        }
    });

    item.addEventListener('keydown', function (e) {
        var keyCode = e.keyCode;
        var currentTabIndex = e.target.tabIndex;
        // Check if backspace key is pressed
        if (keyCode === backSpaceCode && currentTabIndex !== 1) {
            // If backspace is pressed and not at the first input, move focus to the previous input
            document.querySelectorAll('.code').forEach(function (inpt) {
                if (inpt.tabIndex === currentTabIndex - 1) {
                    setTimeout(function () {
                        inpt.focus();
                    }, 100);
                }
            });
        } else if (keyCode !== backSpaceCode && currentTabIndex !== lastTabIndex) {
            // If any other key than backspace is pressed and not at the last input, move focus to the next input
            document.querySelectorAll('.code').forEach(function (inpt) {
                if (inpt.tabIndex === currentTabIndex + 1) {
                    setTimeout(function () {
                        inpt.focus();
                    }, 100);
                }
            });
        }
    });
});

function submitAndActivateCode(token) {

    const apiUrlOut = 'http://localhost:8088/api/v1/auth/activate-account';
    const urlWithToken = `${apiUrlOut}?token=${encodeURIComponent(token)}`;
    const requestOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    };

    fetch(urlWithToken, requestOptions)
        .then(response => {
            console.log(response.status);
            console.log(response);
            if (response.status === 200) {
                activationPage.submit();
            } else {
                alert('Confirm from this Activation Code');
            }
        })
        .catch(error => {
            console.error('Error during activation:', error);
        });
}
