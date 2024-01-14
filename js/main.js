
let key = "9a37c3adf74c43a7a3c63529241401"

let srch = document.querySelector("#srch")

async function getWeather(country) {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${country}&days=3`)
    let result = await response.json();
    console.log(result)
    display(result);
}

// getWeather("cairo");

srch.addEventListener("keyup", function (e) {
    if (e.key == "Enter") {
        getWeather(srch.value);
    }
})

srch.addEventListener("blur", function () {
    getWeather(srch.value);
})

navigator.geolocation.getCurrentPosition(success , error);

function success(position) {
    let latit = position.coords.latitude;
    let longit = position.coords.longitude;
    getWeather(`${latit},${longit}`);
}

function error() {
    getWeather("cairo");
}

function display(result) {
    let days = result.forecast.forecastday;
    let code =""
    for (let i = 0; i < days.length; i++){
        let date = new Date(days[i].date)
        let day = date.toLocaleDateString("ar-eg", { weekday: "long" });
        let dayn = date.toLocaleDateString("en-us",{day:"2-digit"})
        let month = date.toLocaleDateString("ar-eg",{month:"short"})
        code += `
        <div class="col-md-4">
        <div class="card">
          <div class="card-header">
            <span class="date">${day}-${dayn}-${month}</span>
          </div>
          <div class="card-body">
            <span class="city d-block">${result.location.name}</span>
            <img src="https:${days[i].day.condition.icon}"alt="icon" srcset="">
            <p class="temp mb-1 mt-3">${days[i].hour[date.getHours()].temp_c}<span class="oo">o</span> C</p>
            <p class="state">${days[i].day.condition.text}</p>
          </div>
        </div>
      </div>
        `
    }
    document.querySelector('.row').innerHTML = code;
}
