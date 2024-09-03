const btn = document.querySelector("button");

// async function that gets api
async function fetchWeather(location) {
  displayLoading();
  // await keyword that waits for the async function promise to complete
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=82JXSZ3PNPQLN546R6LCWJH22`,
      { mode: "cors" }
    );
    const weather = await response.json(); // turns the data from api into json format

    console.log(weather);
    // Send wanted data to a function that returns an object of that data
    const weatherInfo = info(
      weather.resolvedAddress,
      weather.currentConditions.temp,
      weather.currentConditions.humidity,
      weather.currentConditions.conditions,
      weather.description
    );
    hideLoading();
    // Call render function to display data to the page
    render(weatherInfo);
  } catch {
    const body = document.querySelector("body");
    const card = document.createElement("div");
    card.classList.add("data");
    card.innerHTML = `<h2>Enter a valid location</h2>`;
    body.appendChild(card);
    console.error("Failed");
  }
}

btn.addEventListener("click", async () => {
  const input = document.querySelector("#search").value;
  clearRender();

  await fetchWeather(input);
});

// Turn data to object
function info(place, temp, humidity, conditions, description) {
  return { place, temp, humidity, conditions, description };
}

function render(weatherInfo) {
  const body = document.querySelector("body");
  const card = document.createElement("div");
  card.classList.add("data");
  card.innerHTML = `<h2>${weatherInfo.place}</h2>
  <p>Temperature: ${weatherInfo.temp} F</p>
  <p>Humidity: ${weatherInfo.humidity}%</p>
  <p>${weatherInfo.conditions}</p>
  <p>${weatherInfo.description}</p>`;
  body.appendChild(card);
}

function clearRender() {
  const card = document.querySelector(".data");
  // If card has data then remove it
  if (card !== null) {
    card.remove();
  } else {
    return;
  }
}

function displayLoading() {
  const loader = document.querySelector("#loading");
  loader.classList.add("display");
}

function hideLoading() {
  const loader = document.querySelector("#loading");
  loader.classList.remove("display");
}
