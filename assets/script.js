var searchHistoryArr = [];
var userInput = "";
var APIKey = "&appid=3758324bb7cc715bc0076675d23131b9";

function saveLS() {
    localStorage.setItem("searchHistoryArr", JSON.stringify(searchHistoryArr));
}

function renderDash() {
  for (var i = 0; i < searchHistoryArr.length; i++) {
    var newDiv = $("<div>");
    newDiv = $(("searchHistoryArr[i]").val());
    $("#listHistory").prepend(newDiv);
}}

function pullLS() {
    var lastSearch = JSON.parse(localStorage.getItem("searchHistoryArr"));
    if (searchHistoryArr !== null) {
        lastSearch = searchHistoryArr;
        console.log(lastSearch);
    }
    renderDash();
}

pullLS();

$('#clearBtn').click(function(event) {
    $("#listHistory").empty();
})

$('#submitBtn').click(function(event) {
    event.preventDefault();
    //Take user input, store as var, display to search history and save to lS
    var userInput = $("#input").val();
    (searchHistoryArr).unshift(userInput);
    var historyDiv = $("<div>");
    $("#listHistory").prepend(historyDiv);
    $("#listHistory").prepend(userInput);
    saveLS();
    $("#dayIcon").removeClass();
    $(".colFive").remove();
    $("#dayIcon").addClass("col-6 dayIcon");
 

    //Establish URL for call #1 to acquire lon & lat values based on city name
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

    //Establish URL for call #2 to acquire current & 5-day weather data based on lat & lon
    queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts" + APIKey;
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }) 
    .then(function (response) {
        console.log(response);

    //Transfer content to HTML
    
   $("#now").text(new Date().toLocaleDateString());
   
    $("#temp").text("Temp: " + ((response.current.temp - 273.15) * 1.80 + 32).toFixed(1) + "⁰ F");
    $("#humid").text("Humidity: " + response.current.humidity + "%");
    $("#wind").text("Wind: " + response.current.wind_speed + " mph");

    //UV index work with value & add styling based on value
    var responseUV = response.current.uvi;
    $("#UVBtn").text(response.current.uvi);
        if (responseUV < 3) {$("#UVBtn").addClass("UVBtnMild");
        }

        else if (responseUV > 7) {$("#UVBtn").addClass("UVBtnSevere");
        }

        else {$("#UVBtn").addClass("UVBtnModerate");
        }

    //Show icon based on overall desc of today's weather
    var dayIconText = response.current.weather[0].main;
    console.log(dayIconText);
        if (dayIconText === "Rain") {$(".dayIcon").addClass("fas fa-cloud-rain");
        }
    
        else if (dayIconText === "Snow") {$(".dayIcon").addClass("fas fa-snowman");
        }
        
        else if (dayIconText === "Wind") {$(".dayIcon").addClass("fas fa-wind");
        }
    
        else if (dayIconText === "Sun") {$(".dayIcon").addClass("fas fa-sun");
        }
    
        else if (dayIconText === "Clear") {$(".dayIcon").addClass("fas fa-moon");
        }
    
        else if (dayIconText === "Clouds") {$(".dayIcon").addClass("fas fa-cloud");
        }
    
        else {$(".dayIcon").addClass("fas fa-rainbow");
        }

    //Five day forecast
  
    for (var i = 1; i < 6; i++) {
        var fiveDayDate = new Date(response.daily[i].dt*1000).toLocaleDateString();
        var fiveDayIcon = response.daily[i].weather[0].main;
        var fiveDayTemp = (((response.daily[i].temp.max - 273.15) * 1.80 + 32).toFixed(1) + "⁰ F");
        var fiveDayHumid = (response.daily[i].humidity + "%");
        
        var col = $("<div>").addClass("col-2 col colFive d-flex flex-column");

        if (fiveDayIcon === "Rain") {col.addClass("fas fa-cloud-rain");
        }
    
        else if (fiveDayIcon === "Snow") {col.addClass("fas fa-snowman");
        }
        
        else if (fiveDayIcon === "Wind") {col.addClass("fas fa-wind");
        }
    
        else if (fiveDayIcon === "Sun") {col.addClass("fas fa-sun");
        }
    
        else if (fiveDayIcon === "Clear") {col.addClass("fas fa-moon");
        }
    
        else if (fiveDayIcon === "Clouds") {col.addClass("fas fa-cloud");
        }
    
        else {col.addClass("fas fa-rainbow");
        }
        
        
        col.append(fiveDayDate, "<br>", fiveDayIcon, "<br>", fiveDayTemp, "<br>",fiveDayHumid);
        $(".fiveDayRow").append(col);
    }
   
        //second call function///////////////////////////////
    })
        //first call function///////////////////////////////////
    })
        //on click function/////////////////////////////////
})

