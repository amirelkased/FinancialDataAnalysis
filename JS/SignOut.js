let getToken = window.localStorage.getItem("Token");
let signOutButton = document.getElementById("xSignOut");

function logout() {
    preventSignOut(event);
}

const apiUrlOut = 'http://localhost:8088/api/v1/auth/logout';

function preventSignOut(event) {
    event.preventDefault();
    function submitFormOut() {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken,
            },
        };
        fetch(apiUrlOut, requestOptions)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('Failed to logout');
                }
                window.localStorage.removeItem("Token");
                window.localStorage.removeItem("predictionData");
                window.localStorage.removeItem("Marketindicators");
                window.localStorage.removeItem("flag");
                window.localStorage.setItem("flag","false")
                location.reload();
                updateUIOnLogout(); // Update UI after successful logout
                return response.text();
            })
            .catch(error => {
                console.error('Error during sign-out:', error);
            });
    }
    submitFormOut();
}

function updateUIOnLogout() {
    // Enable Sign-Up and Sign-In, Disable Sign-Out
    document.getElementById("SinUp").classList.remove("disableSignUp");
    document.getElementById("SinUp").classList.add("x");
    document.getElementById("SinIn").classList.remove("disableSignIn");
    document.getElementById("SignOut").classList.add("disableSignOut");
}

// Add event listener to the Sign-Out button
signOutButton.addEventListener('click', logout);
