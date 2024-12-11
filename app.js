// Weather Application
const API_KEY = "b5bcd86a39fe4b8973dc432c0431a2ea";

let inputfield = document.getElementById("inputfield");
let showWeather = document.getElementById("showWeather");
let recentSection = document.getElementById("recentSection");
let searchButton = document.getElementById("searchBtn");
let loader = document.getElementById("loader");
let buttonText = document.getElementById("buttonText");

// Initialize recent cities array
let recentCities = [];

document.addEventListener("DOMContentLoaded", () => {
    // Add Enter key shortcut for the search button
    inputfield.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            searchBtn();
        }
    });
});

// Function triggered on the search button click
let searchBtn = async () => {
    if (!inputfield.value) {
        Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "Please enter a city name!",
        });
        return;
    }

    // Show loader and disable the button
    loader.style.display = "inline-block";
    buttonText.style.display = "none";
    searchButton.disabled = true;

    const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${inputfield.value}&appid=${API_KEY}`;
    try {
        // Fetch weather data from the API
        const fetchData = await fetch(api_url);
        const response = await fetchData.json();

        // Check for errors in response
        if (response.cod === "404") {
            Swal.fire({
                icon: "error",
                title: "City Not Found",
                text: "Please try searching for a different city.",
            });
            return;
        }

        // Display the weather data
        showData(response);
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred while fetching weather data. Please try again later.",
        });
        console.error(error);
    } finally {
        // Hide loader and re-enable the button
        loader.style.display = "none";
        buttonText.style.display = "inline-block";
        searchButton.disabled = false;
    }
};

// Function to display the weather data
let showData = (data) => {
    const tempCelsius = (data.main.temp - 273.15).toFixed(2); // Convert temperature from Kelvin to Celsius

    showWeather.innerHTML = `
        <div class="weather-card">
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
            <div class="card-body">
                <h2 class="temperature">${tempCelsius} °C</h2>
                <h3 class="city-name">${data.name}, ${data.sys.country}</h3>
                <p class="weather-description">${data.weather[0].description}</p>
            </div>
        </div>
    `;

    // Clear the input field
    inputfield.value = "";
};
