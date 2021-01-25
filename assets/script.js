var searchHistoryArr = [];
var userInput = "";
var APIKey = "&appid=3758324bb7cc715bc0076675d23131b9";


$('#submitBtn').click(function(event) {
    event.preventDefault();
    var userInput = $("#input").val();
    (searchHistoryArr).unshift(userInput);
    var historyDiv = $("<div>");
    $("#listHistory").prepend(historyDiv);
    $("#listHistory").prepend(userInput);
    saveLS();
    var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + userInput + APIKey;
       
    $.ajax({
        url: queryURL,
        method: "GET"
    }) 
    .then(function (response) {
        console.log(response);
        var lat = response[0].lat;
        var lon = response[0].lon;
        var city = response[0].name;
        $("#cityNameResult").text(city);
        console.log(lat);
        console.log(lon);

    queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts" + APIKey;

    
    $.ajax({
        url: queryURL,
        method: "GET"
    }) 
    .then(function (response) {
        console.log(response);
    //Transfer content to HTML
   
    $("#now").text(response.current.dt);  
    var tempF = (response.current.temp - 273.15) * 1.80 + 32;
    $("#temp").text("Temp: " + tempF.toFixed(1) + "⁰ F");
    $("#humid").text("Humidity: " + response.current.humidity + "%");
    $("#wind").text("Wind: " + response.current.weather[0].wind_speed + " MPH");
    var responseUV = response.current.uvi;
    console.log(responseUV);
    $("#UVBtn").text(response.current.uvi);
    if (responseUV < 3) {
        $("#UVBtn").addClass("UVBtnMild");
        }

    else if (responseUV > 7) {
        $("#UVBtn").addClass("UVBtnSevere");
    }

    else {
        $("#UVBtn").addClass("UVBtnModerate");
    }
    
        // else if (dayIconText === "Snow") {
        // $(".dayIcon").addClass("fas fa-snowman");
        // }
        
        // else if (dayIconText === "Wind") {
        // $(".dayIcon").addClass("fas fa-wind");
        // }
    var dayIconText = response.current.weather[0].main;
    console.log(dayIconText);
    if (dayIconText === "Rain") {
        $(".dayIcon").addClass("fas fa-cloud-rain");
        }
    
        else if (dayIconText === "Snow") {
        $(".dayIcon").addClass("fas fa-snowman");
        }
        
        else if (dayIconText === "Wind") {
        $(".dayIcon").addClass("fas fa-wind");
        }
    
        else if (dayIconText === "Sun") {
        $(".dayIcon").addClass("fas fa-sun");
        }
    
        else if (dayIconText === "Clear") {
        $(".dayIcon").addClass("fas fa-moon");
        }
    
        else if (dayIconText === "Clouds") {
        $(".dayIcon").addClass("fas fa-cloud");
        }

        else if (dayIconText === "Mist") {
            $(".dayIcon").addClass("fas fa-smog");
            }
    
        else {
        $(".dayIcon").addClass("fas fa-rainbow");
        }
    })
    

    //Transfer content to HTML
    
    
    
    
    
    
    // $("#humid").text("Humidity: " + response.main.humidity + "%");
    // $("#wind").text("Wind: " + response.wind.speed + " MPH");
    // $("#UV").text("UV index: ");
    // var UV = 65;
    // var btn = $("<button>");
    // btn.addClass("UVBtn");

    // if (UV < 70) {
    //     $(".UVBtn").addClass("yellow");
    // }
    // else if (UV > 89) {
    //     $(".UVBtn").addClass("red");
    // }
    // else {
    //     $(".UVBtn").addClass("orange");
    // }
    
    // btn.text(UV);
    // $("#UV").append(btn);
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

$('#clearBtn').click(function(event) {
    $("#listHistory").empty();
})