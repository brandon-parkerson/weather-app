
const btn = document.querySelector("button");



async function fetchWeather(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=82JXSZ3PNPQLN546R6LCWJH22`,
    { mode: "cors" }
  );
  const weather = await response.json();
  console.log(weather.currentConditions);
}

btn.addEventListener("click", async () => {
    const input = document.querySelector("#search").value;
    await fetchWeather(input);
})


