const voteForm = document.getElementById("VoteForm");
const voteSearch = document.getElementsByClassName("voteSearch")[0];
const stockName = document.getElementById("name");
const stockOpen = document.getElementById("open");
const stockClose = document.getElementById("close");
const votes = document.getElementById("votes");
const voting = document.getElementsByClassName("Votes")[0];
const timeout = document.getElementById("sendVote");
const searchbox = document.getElementById('suggestionsList');
const txtSearch = document.getElementById('votesSearch');

const stocks = {
    1: "TESLA",
    2: "APPLE",
    3: "NVIDIA",
    4: "GOOGLE",
    5: "META",
    6: "MICROSOFT",
    7: "PFIZER",
    8: "AMD",
    9: "NETFLIX",
    10: "IBM"
};

let suggestions = [
    "TESLA",
    "APPLE",
    "NVIDIA",
    "GOOGLE",
    "META",
    "MICROSOFT",
    "PFIZER",
    "AMD",
    "NETFLIX",
    "IBM"
];

let stockId = null;

function search(event, stockId) {
    event.preventDefault();

    let getToken = window.localStorage.getItem("Token");
    const apiUrl = `http://localhost:8088/api/v1/stocks/votes/${stockId}`;
    const view = document.getElementsByClassName("info")[0];

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
            txtSearch.value="";
            if (response.status === 200) {
                view.style.visibility = "visible";
                txtSearch.value="";
                return response.json();
            } else {
                throw new Error('Failed to fetch data');
            }
        })
        .then(data => {
            stockName.value = data.name;
            stockOpen.value = data.open;
            stockClose.value = data.close;
            votes.value = data.votes;
        })
        .catch(error => {
            view.style.visibility = "hidden";
            console.error('Error:', error);
            alert('Failed to fetch stock data. Please try again later and make sure you signed in');
        });
}

voteSearch.addEventListener("click", function (event) {
    const selectUserData = txtSearch.value.trim().toUpperCase();
    if (!selectUserData) {
        console.error("Search input is empty or undefined.");
        return;
    }

    for (const [key, value] of Object.entries(stocks)) {
        if (value === selectUserData) {
            stockId = key;
            break;
        }
    }

    if (stockId === null) {
        alert("No matching stock ID found.");
        return;
    }

    searchbox.classList.remove("active"); // Hide the searchbox
    search(event, stockId);
});

const sendVoting = document.getElementById("voteButton");
sendVoting.addEventListener("click", function (event) {
    event.preventDefault();

    if (stockId === null) {
        alert("No stock selected for voting.");
        return;
    }

    let votingValue = document.getElementById("voting").value;
    let vot = document.getElementById("voting");
    const apiUrl = `http://localhost:8088/api/v1/stocks/votes/${stockId}`;
    let getToken = window.localStorage.getItem("Token");
    const urlWithToken = `${apiUrl}?value=${encodeURIComponent(votingValue)}`;

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
                search(event, stockId);
                vot.value = '';
                return response.json();
            }
            else{
                alert("Voting is closed")
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

function getStockIdByName(stockName) {
    for (const [key, value] of Object.entries(stocks)) {
        if (value.toUpperCase() === stockName.toUpperCase()) {
            return key;
        }
    }
    return null;
}

function timeOut() {
    const now = new Date();
    return now.getHours() === 15 && now.getMinutes() === 59;
}

function hideInput() {
    timeout.style.display = "none";
}

function showInput() {
    timeout.style.display = "block";
    timeout.style.display = "flex";
    timeout.style.justifyContent = "center !important";
}

function checkTimeOut() {
    if (timeOut()) {
        hideInput();
    } else {
        showInput();
    }
}

checkTimeOut();
setInterval(checkTimeOut, 60000); // Check every minute (60000 milliseconds)

function timeUpdate() {
    const now = new Date();
    return now.getHours() === 0 && now.getMinutes() === 0;
}

function checkTimeUpdate() {
    if (timeUpdate()) {
        showInput();
    }
}

checkTimeUpdate();
setInterval(checkTimeUpdate, 60000); // Check every minute (60000 milliseconds)

const filterSuggestions = (userData) => {
    return suggestions
        .filter((data) =>
            data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase())
        )
        .map((data) => `<li>${data}</li>`);
};

const showSuggestions = (list) => {
    const listData = list.length ? list.join('') : `<li>${txtSearch.value}</li>`; // Display appropriate message if no suggestions
    searchbox.innerHTML = listData;
};

const handleInput = (e) => {
    const userData = e.target.value;
    if (userData) {
        const filteredArray = filterSuggestions(userData);
        searchbox.classList.add("active");
        showSuggestions(filteredArray);
    } else {
        searchbox.classList.remove("active");
    }
};

const handleSuggestionClick = (e) => {
    if (e.target.tagName === "LI") {
        selectSuggestion(e.target);
        searchbox.classList.remove("active"); // Hide suggestions after selection
    }
};

const selectSuggestion = (element) => {
    const selectUserData = element.textContent;
    txtSearch.value = selectUserData; // Update search input with selected suggestion

    // Find stock ID based on selected suggestion
    for (const [key, value] of Object.entries(stocks)) {
        if (value.toLowerCase() === selectUserData.toLowerCase()) {
            stockId = key;
            break;
        }
    }

    // Trigger search
    if (stockId !== null) {
        const event = new Event('search'); // Create a new event
        search(event, stockId); // Call search function directly
    }
};

txtSearch.addEventListener('input', handleInput);
searchbox.addEventListener('click', handleSuggestionClick);
