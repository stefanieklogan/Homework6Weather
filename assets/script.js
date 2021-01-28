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
console.log(searchHistoryArr);
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
    // fiveDayArr = [];
    //     console.log(response.daily.length);
  
    for (var i = 1; i < 6; i++) {
        var fiveDayDate = new Date(response.daily[i].dt*1000).toLocaleDateString();
        var fiveDayIcon = response.daily[i].weather[0].main;
        var fiveDayTemp = (((response.daily[i].temp.max - 273.15) * 1.80 + 32).toFixed(1) + "⁰ F");
        var fiveDayHumid = (response.daily[i].humidity + "%");
        // fiveDayArr.push(fiveDayDate);
        // fiveDayArr.push(fiveDayIcon);
        // fiveDayArr.push(fiveDayTemp);
        // fiveDayArr.push(fiveDayHumid);
        console.log(fiveDayDate);
        console.log(fiveDayIcon);
        console.log(fiveDayTemp);
        console.log(fiveDayHumid);
        var col = $("<div>").addClass("col-2 col d-flex flex-column");
        
        if (fiveDayIcon === "Rain") {col.addClass("fas fa-cloud-rain");}
    
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
   

    // Day 1 of 5 /////////////////////////////////////////
    $(".dayOne").removeClass();
    $("#dayOne").addClass("col-6 dayIcon");
    $("#dayOneDt").text(Date(response.daily[0].dt));
    console.log(new Date(response.daily[0].dt*1000).toLocaleDateString());
    console.log(new Date(response.daily[1].dt*1000).toLocaleDateString());
    var dayOneIconText = response.daily[0].weather[0].main;
    console.log(dayOneIconText);
    
    if (dayOneIconText === "Rain") {$(".dayOne").addClass("fas fa-cloud-rain");
        }
    
        else if (dayOneIconText === "Snow") {$(".dayOne").addClass("fas fa-snowman");
        }
        
        else if (dayOneIconText === "Wind") {$(".dayOne").addClass("fas fa-wind");
        }
    
        else if (dayOneIconText === "Sun") {$(".dayOne").addClass("fas fa-sun");
        }
    
        else if (dayOneIconText === "Clear") {$(".dayOne").addClass("fas fa-moon");
        }
    
        else if (dayOneIconText === "Clouds") {$(".dayOne").addClass("fas fa-cloud");
        }
    
        else {$(".dayOne").addClass("fas fa-rainbow");
        }
    
    $("#dayOneTemp").text(((response.daily[0].temp.max - 273.15) * 1.80 + 32).toFixed(1) + "⁰ F");
    $("#dayOneHumid").text(response.daily[0].humidity + "% humidity");

    // Day 2 of 5 /////////////////////////////////////////
    $(".dayTwo").removeClass();
    $("#dayTwo").addClass("col-6 dayIcon");
    $("#dayTwoDt").text(Date(response.daily[1].dt));
    var dayTwoIconText = response.daily[1].weather[1].main;
    console.log(dayTwoIconText);
    if (dayTwoIconText === "Rain") {$(".dayTwo").addClass("fas fa-cloud-rain");
        }
    
        else if (dayTwoIconText === "Snow") {$(".dayTwo").addClass("fas fa-snowman");
        }
        
        else if (dayTwoIconText === "Wind") {$(".dayTwo").addClass("fas fa-wind");
        }
    
        else if (dayTwoIconText === "Sun") {$(".dayTwo").addClass("fas fa-sun");
        }
    
        else if (dayTwoIconText === "Clear") {$(".dayTwo").addClass("fas fa-moon");
        }
    
        else if (dayTwoIconText === "Clouds") {$(".dayTwo").addClass("fas fa-cloud");
        }
    
        else {$(".dayOne").addClass("fas fa-rainbow");
        }
    
    $("#dayTwoTemp").text(((response.daily[1].temp.max - 273.15) * 1.80 + 32).toFixed(1) + "⁰ F");
    $("#dayTwoHumid").text(response.daily[1].humidity + "% humidity");

     // Day 3 of 5 /////////////////////////////////////////
     $(".dayThree").removeClass();
    $("#dayT").addClass("col-6 dayIcon");
     $("#dayThreeDt").text(Date(response.daily[2].dt));
     var dayThreeIconText = response.current.weather[1].main;
     console.log(dayThreeIconText);
     if (dayThreeIconText === "Rain") {$(".dayThree").addClass("fas fa-cloud-rain");
         }
     
         else if (dayThreeIconText === "Snow") {$(".dayThree").addClass("fas fa-snowman");
         }
         
         else if (dayThreeIconText === "Wind") {$(".dayThree").addClass("fas fa-wind");
         }
     
         else if (dayThreeIconText === "Sun") {$(".dayThree").addClass("fas fa-sun");
         }
     
         else if (dayThreeIconText === "Clear") {$(".dayThree").addClass("fas fa-moon");
         }
     
         else if (dayThreeIconText === "Clouds") {$(".dayThree").addClass("fas fa-cloud");
         }
     
         else {$(".dayThree").addClass("fas fa-rainbow");
         }
     
     $("#dayThreeTemp").text(((response.daily[2].temp.max - 273.15) * 1.80 + 32).toFixed(1) + "⁰ F");
     $("#dayThreeHumid").text(response.daily[2].humidity + "% humidity");
    
     // Day 4 of 5 /////////////////////////////////////////
     $("#dayFourDt").text(Date(response.daily[3].dt));
     // var dayOneIconText = response.current.weather[1].main;
     // console.log(dayOneIconText);
     // if (dayOneIconText === "Rain") {$(".dayOne").addClass("fas fa-cloud-rain");
     //     }
     
     //     else if (dayOneIconText === "Snow") {$(".dayOne").addClass("fas fa-snowman");
     //     }
         
     //     else if (dayOneIconText === "Wind") {$(".dayOne").addClass("fas fa-wind");
     //     }
     
     //     else if (dayOneIconText === "Sun") {$(".dayOne").addClass("fas fa-sun");
     //     }
     
     //     else if (dayOneIconText === "Clear") {$(".dayOne").addClass("fas fa-moon");
     //     }
     
     //     else if (dayOneIconText === "Clouds") {$(".dayOne").addClass("fas fa-cloud");
     //     }
     
     //     else {$(".dayOne").addClass("fas fa-rainbow");
     //     }
     
     $("#dayFourTemp").text(((response.daily[3].temp.max - 273.15) * 1.80 + 32).toFixed(1) + "⁰ F");
     $("#dayFourHumid").text(response.daily[3].humidity + "% humidity");

     // Day 5 of 5 /////////////////////////////////////////
     $("#dayFiveDt").text(Date(response.daily[4].dt));
     // var dayOneIconText = response.current.weather[1].main;
     // console.log(dayOneIconText);
     // if (dayOneIconText === "Rain") {$(".dayOne").addClass("fas fa-cloud-rain");
     //     }
     
     //     else if (dayOneIconText === "Snow") {$(".dayOne").addClass("fas fa-snowman");
     //     }
         
     //     else if (dayOneIconText === "Wind") {$(".dayOne").addClass("fas fa-wind");
     //     }
     
     //     else if (dayOneIconText === "Sun") {$(".dayOne").addClass("fas fa-sun");
     //     }
     
     //     else if (dayOneIconText === "Clear") {$(".dayOne").addClass("fas fa-moon");
     //     }
     
     //     else if (dayOneIconText === "Clouds") {$(".dayOne").addClass("fas fa-cloud");
     //     }
     
     //     else {$(".dayOne").addClass("fas fa-rainbow");
     //     }
     
     $("#dayFiveTemp").text(((response.daily[4].temp.max - 273.15) * 1.80 + 32).toFixed(1) + "⁰ F");
     $("#dayFiveHumid").text(response.daily[4].humidity + "% humidity");
        //second call function///////////////////////////////
    })
        //first call function///////////////////////////////////
    })
        //on click function/////////////////////////////////
})

