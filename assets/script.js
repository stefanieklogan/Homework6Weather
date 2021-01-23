var searchHistoryArr = [];

$('#submitBtn').click(function(e) {
    e.preventDefault();
    var userInput = $("#input").val();
    (searchHistoryArr).unshift(userInput);
    var historyDiv = $("<div>");
    $("#listHistory").prepend(historyDiv);
    $("#listHistory").prepend(userInput);
    saveLS();
})

function saveLS() {
    localStorage.setItem("searchHistoryArr", JSON.stringify(searchHistoryArr));
}

function renderDash() {
    // searchHistoryArr.forEach(function (search) {
    // var newDiv = document.createElement("<div>");
    // newDiv.textContent = search;
    // listHistoryEl.appendChild(newDiv);
    // }
    // {
    // var historyDiv = $("<div>");
    // historyDiv = $("searchHistoryArr[i]").val();
    // $("#listHistory").prepend(historyDiv);
    // }
}

function pullLS() {
    var lastSearch = JSON.parse(localStorage.getItem("searchHistoryArr"));
    if (searchHistoryArr !== null) {
        searchHistoryArr = lastSearch;
        console.log(lastSearch);
    }
    renderDash();
}