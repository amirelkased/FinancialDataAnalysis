import { suggestions } from "./StockName.js";

document.addEventListener("DOMContentLoaded", function () {
    const wrapper = document.querySelector(".search-input");
    const input = wrapper.querySelector(".search");
    const suggestBox = wrapper.querySelector(".boxSearch");

    input.addEventListener("keyup", function (e) {
        const userData = e.target.value;
        const emptyArray = suggestions.filter((data) =>
            data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase())
        ).map((data) => `<li>${data}</li>`);
        
        if (userData) {
            wrapper.classList.add("active");
            showSuggestions(emptyArray);
        } else {
            wrapper.classList.remove("active");
        }
    });

    suggestBox.addEventListener("click", function (e) {
        if (e.target.tagName === "LI") {
            select(e.target);
        }
    });
});

function select(element) {
    const selectUserData = element.textContent;
    const input = document.querySelector(".search");
    input.value = selectUserData;
    const wrapper = document.querySelector(".search-input");
    wrapper.classList.remove("active");
}

function showSuggestions(list) {
    const suggestBox = document.querySelector(".boxSearch");
    const listData = list.length ? list.join('') : `<li>${input.value}</li>`;
    suggestBox.innerHTML = listData;
}
