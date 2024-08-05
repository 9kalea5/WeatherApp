const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "2d0437f6403218849775c228b5cdd1ea";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value;
    console.log("City entered:", city);

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            console.log("Weather Data:", weatherData);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error("Error fetching weather data:", error);
            displayError("Could not fetch weather data. Please try again later.");
        }
    }
    else{
        displayError("Please enter a city");
    }
});


async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    console.log("Fetching weather data from URL:", apiUrl);

    try {
        const response = await fetch(apiUrl);
        if(!response.ok){
            console.error("Response not OK:", response);
            throw new Error("Could not fetch weather data");
        }
        return await response.json();
    } catch (error) {
        console.error("Error during fetch:", error);
        throw error;
    }
}


function displayWeatherInfo(data){
    const{
        name: city,
        main: {temp, humidity},
        weather: [{description, id}]} = data;
        card.textContent = "";
        card.style.display = "flex";

        const cityDisplay = document.createElement("h1");
        const tempDisplay = document.createElement("h1");
        const humidityDisplay = document.createElement("h1");
        const descDisplay = document.createElement("h1");
        const weatherEmoji = document.createElement("h1");


        cityDisplay.textContent = city;
        tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
        humidityDisplay.textContent = `Humidity: ${humidity}%`;
        descDisplay.textContent = description;
        weatherEmoji.textContent = getWeatherEmoji(id);

        cityDisplay.classList.add("cityDisplay");
        tempDisplay.classList.add("tempDisplay");
        humidityDisplay.classList.add("humidityDisplay");
        descDisplay.classList.add("descDisplay")
        weatherEmoji.classList.add("weatherEmoji")

        card.appendChild(cityDisplay);
        card.appendChild(tempDisplay);
        card.appendChild(humidityDisplay);
        card.appendChild(descDisplay);
        card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "🌧️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId === 800):
            return "☀️";
        default:
            return "?";
        console.log(weatherId);
    }
}

function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
    
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}