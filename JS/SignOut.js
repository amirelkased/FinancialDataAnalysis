let getToken = window.localStorage.getItem("Token");
let SignOut = document.getElementById("xSignOut");
SignOut.onclick = function () {
    preventSignOut(event);
    document.getElementById("SinUp").classList.remove("disableSignUp");
    document.getElementById("SinUp").classList.add("x");
    document.getElementById("SinIn").classList.remove("disableSignIn");
    document.getElementById("SignOut").classList.add("disableSignOut");
    window.localStorage.setItem("Token", "");
}
const apiUrlOut = 'http://localhost:9194/auth/logout';
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
                return response.text();
            })
            .then(data => {
                console.log('Sign-out successful:', data);
            })
            .catch(error => {
                console.error('Error during sign-out:', error);
            });
    }
    submitFormOut();
}