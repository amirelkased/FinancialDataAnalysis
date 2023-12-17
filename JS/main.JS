let wrapper=document.getElementsByClassName("search-input")[0];
let input = wrapper.getElementsByClassName("search")[0];
let suggestBox = wrapper.getElementsByClassName("boxSearch")[0];

input.onkeyup = (e) => {
    let userData = e.target.value;
    let emptyArray = [];
    if (userData) { //search يعنى هل فيه داتا جوا ال
        emptyArray = suggestions.filter((data) => {
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArray=emptyArray.map((data)=>{
            return data='<li>'+data+'</li>';
        });
        wrapper.classList.add("active");
        showSuggestions(emptyArray);
        let allList=suggestBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            allList[i].setAttribute("onclick","select(this)");
        }
    }else{
        wrapper.classList.remove("active");
    }
}

function select(elment){
    let selectUserData=elment.textContent;
    input.value=selectUserData;
    wrapper.classList.remove("active");
}

function showSuggestions(list){
let listData;
if(!list.length){
userValue=input.value;
listData='<li>' + userValue + '</li>';
}
else{
    listData= list.join('');
}
suggestBox.innerHTML=listData;
}