const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const forecastParagraphs = document.getElementsByClassName("msg");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = search.value;

    forecastParagraphs[0].innerHTML = "Loading...";
    forecastParagraphs[1].innerHTML = "";
  
    fetch("/weather?adress=" + location + "").then((response) => {
        response.json().then((data) => {
            if (data.error) {
                forecastParagraphs[1].innerHTML = "";
                return forecastParagraphs[0].innerHTML = data.error;
            }
            else {
            forecastParagraphs[0].innerHTML = data.location;
            forecastParagraphs[1].innerHTML = data.forecast;
            }
        })
    })
})





