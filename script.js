const btn = document.querySelector("button");

async function fetchWeather(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=82JXSZ3PNPQLN546R6LCWJH22`,
    { mode: "cors" }
  );
  const weather = await response.json();
  console.log(weather);
  const weatherInfo = info(
    weather.resolvedAddress,
    weather.currentConditions.temp,
    weather.currentConditions.humidity,
    weather.currentConditions.conditions,
    weather.description
  );
  render(weatherInfo);
}

btn.addEventListener("click", async () => {
  const input = document.querySelector("#search").value;
  await fetchWeather(input);
});

function info(place, temp, humidity, conditions, description) {
  return { place, temp, humidity, conditions, description };
}

function render(weatherInfo) {
  const body = document.querySelector("body");
  const card = document.createElement("div");
  card.innerHTML = `<h2>${weatherInfo.place}</h2>
  <p>${weatherInfo.temp}</p>
  <p>${weatherInfo.humidity}</p>
  <p>${weatherInfo.conditions}</p>
  <p>${weatherInfo.description}</p>`;
  body.appendChild(card);
}
