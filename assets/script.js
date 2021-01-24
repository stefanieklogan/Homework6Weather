var searchHistoryArr = [];
var userInput = "";
var APIKey = "3758324bb7cc715bc0076675d23131b9";


$('#submitBtn').click(function(event) {
    event.preventDefault();
    var userInput = $("#input").val();
    (searchHistoryArr).unshift(userInput);
    var historyDiv = $("<div>");
    $("#listHistory").prepend(historyDiv);
    $("#listHistory").prepend(userInput);
    saveLS();
    var queryCity = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=3758324bb7cc715bc0076675d23131b9";

    $.ajax({
        url: queryCity,
        method: "GET"
    }) 
    .then(function (response) {
        console.log(response);

    //Transfer content to HTML
    var tempF = (response.main.temp - 273.15) * 1.80 + 32;
    // var now = moment().format('L');
    $("#cityNameResult").text(response.name);
    // $("#dayIcon").text(response.weather.[i].main);
    // $("#now").text(now);
    $("#temp").text("Temp: " + tempF.toFixed(1) + "⁰ F");
    $("#humid").text("Humidity: " + response.main.humidity + "%");
    $("#wind").text("Wind: " + response.wind.speed + " MPH");
    $("#UV").text("UV index: ");
    var UV = 65;
    var btn = $("<button>");
    btn.addClass("UVBtn");

    if (UV < 70) {
        $(".UVBtn").addClass("yellow");
    }
    // else if (UV > 89) {
    //     $(".UVBtn").addClass("red");
    // }
    // else {
    //     $(".UVBtn").addClass("orange");
    // }
    
    btn.text(UV);
    $("#UV").append(btn);
    })
})

function saveLS() {
    localStorage.setItem("searchHistoryArr", JSON.stringify(searchHistoryArr));
}

// function renderDash() {
//   for (var i = 0; i < searchHistoryArr.length; i++) {
//     var newDiv = $("<div>");
//     newDiv = $("searchHistoryArr[i]").val();
//     $("#listHistory").prepend(newDiv);
// }}

function pullLS() {
    var lastSearch = JSON.parse(localStorage.getItem("searchHistoryArr"));
    if (searchHistoryArr !== null) {
        searchHistoryArr = lastSearch;
        console.log(lastSearch);
    }
    renderDash();
}

