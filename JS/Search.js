import { suggestions } from "./StocksNames.js";
let searchStock = document.getElementsByClassName('searchStock')[0];
document.addEventListener("DOMContentLoaded", function () {
    const wrapper = document.querySelector(".search-input");
    if (!wrapper) {
        console.error('Wrapper element not found');
        return;
    }

    const input = wrapper.querySelector(".search");
    const suggestBox = wrapper.querySelector(".boxSearch");

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

    const apiUrl = 'http://localhost:8088/api/v1/stocks/predictions';

    const debounce = (func, delay) => {
        let debounceTimer;
        return function () {
            const context = this;
            const args = arguments;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        };
    };

    const filterSuggestions = (userData) => {
        return suggestions
            .filter((data) =>
                data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase())
            )
            .map((data) => `<li>${data}</li>`);
    };

    const showSuggestions = (list) => {
        const listData = list.length ? list.join('') : `<li>${input.value}</li>`;
        suggestBox.innerHTML = listData;
    };

    const handleInput = (e) => {
        const userData = e.target.value;
        if (userData) {
            const filteredArray = filterSuggestions(userData);
            wrapper.classList.add("active");
            showSuggestions(filteredArray);
        } else {
            wrapper.classList.remove("active");
        }
    };

    const handleSuggestionClick = (e) => {
        if (e.target.tagName === "LI") {
            selectSuggestion(e.target);
        }
    };

    const selectSuggestion = (element) => {
        const selectUserData = element.textContent;
        input.value = selectUserData;
        wrapper.classList.remove("active");

        let stockId = null;
        for (const [key, value] of Object.entries(stocks)) {
            if (value.toLowerCase() === selectUserData.toLowerCase()) {
                stockId = key;
                console.log(`Selected stock ID: ${key}`);
                break;
            }
        }

        if (stockId !== null) {
            const noOfDay = 15; // You can change this value as needed
            const requestBody = {
                stockId: parseInt(stockId),
                noOfDay: noOfDay
            };
            sendStockPredictionRequest(requestBody);
        }
    };

    const sendStockPredictionRequest = (requestBody) => {
        const getToken = window.localStorage.getItem("Token");
        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken,
            },
            body: JSON.stringify(requestBody)
        };

        fetch(apiUrl, requestOptions)
            .then(response => {
                input.value="";
                console.log(response.status);
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch predictions');
                }
            })
            .then(data => {
                console.log('Prediction Data:', data);
                localStorage.setItem('predictionData', JSON.stringify(data));
                navigateToPredictionPage();
            })
            .catch(error => {
                console.error('Error:', error);
                alert("make sure from the name of stock and you signed in");
            });
    };

    const navigateToPredictionPage = () => {
        window.location.href = "prediction.html"; // Replace with the actual new page URL
    };

    input.addEventListener("keyup", debounce(handleInput, 300));
    suggestBox.addEventListener("click", handleSuggestionClick);

    // Add event listener to searchStock element to open a new page if clicked
    searchStock.addEventListener("click", function () {
        const selectUserData = input.value;
        let stockId = null;
        for (const [key, value] of Object.entries(stocks)) {
            if (value.toLowerCase() === selectUserData.toLowerCase()) {
                stockId = key;
                break;
            }
        }
        if (stockId !== null) {
            const noOfDay = 15; // You can change this value as needed
            const requestBody = {
                stockId: parseInt(stockId),
                noOfDay: noOfDay
            };
            sendStockPredictionRequest(requestBody);
        }
    });
});
