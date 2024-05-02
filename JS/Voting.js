var voteForm = document.getElementById("VoteForm");
var voteSearch = document.getElementsByClassName("voteSearch")[0];
const stockName = document.getElementById("name");
const stockOpen = document.getElementById("open");
const stockClose = document.getElementById("close");
const votes = document.getElementById("votes");
const voting = document.getElementsByClassName("Votes")[0];
const timeout = document.getElementById("sendVote");

function search(event) {
    event.preventDefault();

    let getToken = window.localStorage.getItem("Token");
    const apiUrl = 'http://localhost:8088/api/v1/stock/vote/1?1';
    const view = document.getElementsByClassName("info")[0];
    function submitForm() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken,
            },
        };
        fetch(apiUrl, requestOptions)
            .then(response => {
                console.log(response.status);
                if (response.status === 200) {
                    view.style.visibility = "visible";
                    return response.json();
                }
            })
            .then(data => {
                console.log("data", data)
                stockName.value = data.name;
                stockOpen.value = data.open;
                stockClose.value = data.close;
                votes.value = data.votes;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    submitForm();
};
voteSearch.addEventListener("click", search);

const sendVoting = document.getElementById("voteButton");
sendVoting.addEventListener("click", function (event) {
    event.preventDefault();

    let voting = document.getElementById("voting").value;
    let vot=document.getElementById("voting");
    const apiUrl = 'http://localhost:8088/api/v1/stock/vote/1';
    let getToken = window.localStorage.getItem("Token");
    const urlWithToken = `${apiUrl}?value=${encodeURIComponent(voting)}`;
    function submitVoting() {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken,
            },
        };
        fetch(urlWithToken, requestOptions)
            .then(response => {
                console.log(response.status);
                if (response.status === 200) {
                    search(event);
                    vot.value='';
                    return response.json();
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    submitVoting();
});
function timeOut() {
    var now = new Date();
    return now.getHours() === 15 && now.getMinutes() === 59;
}

// Function to hide the input element
function hideInput() {
    timeout.style.display = "none";
}

if (timeOut()) {
    hideInput();
} else {
    // Check every minute if it's 11:59 PM and hide the input element
    setInterval(function () {
        if (timeOut()) {
            hideInput();
        }
    }, 60000); // Check every minute (60000 milliseconds)
}

function timeUpdate() {
    var now = new Date();
    return now.getHours() === 0 && now.getMinutes() === 0 ;
}

// Function to hide the input element
function showInput() {
    timeout.style.display = "block";
    timeout.style.justifyContent = "center !important"
}

if (timeUpdate()) {
    showInput();
} else {
    // Check every minute if it's 11:59 PM and hide the input element
    setInterval(function () {
        if (timeUpdate()) {
            showInput();
        }
    }, 60000); // Check every minute (60000 milliseconds)
}