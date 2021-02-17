let appId='f820a6a338003f3ad4e622ee4b706b2a';
let units='metric';
let searchMethod = 'zip';
function getSearchMethod(searchTerm)
{
    if (searchTerm.length==5 && Number.parseInt(searchTerm)+''==searchTerm)
    {
        searchMethod='zip';
    }
    else
    {
        searchMethod='q';
    }
}
function searchWeather(searchTerm)
{
    getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result =>{
        return result.json();
    }).then(result => {
        init(result);
    })
}
function init (resultfromServer)
{
    switch (resultfromServer.weather[0].main) {
        case "Clear":
            document.body.style.backgroundImage = 'url("clear.jpg")';
            break;
        case "Drizzle":
            document.body.style.backgroundImage = 'url("rain.jpg")';
            break;
        case "Clouds":
            document.body.style.backgroundImage = 'url("clouds.jpg")';
            break;
        case "Thunderstorm":
            document.body.style.backgroundImage = 'url("thunderstorm.jpg")';
            break;
        case "Rain":
            document.body.style.backgroundImage = 'url("rain.jpg")';
            break;
        case "Snow":    
            document.body.style.backgroundImage = 'url("snow.jpg")';
        case "Mist":
            document.body.style.backgroundImage = 'url("mist.jpg")';
            break;
        default:
            document.body.style.backgroundImage = 'url("clear.jpg")';
            break;
    }
    let weatherDescriptionHeader=document.getElementById('weatherDescriptionHeader');
    let temperatureElement=document.getElementById('temperature');
    let windSpeedElement=document.getElementById('windSpeed');
    let pressureElement=document.getElementById('pressure');
    let tempminElement=document.getElementById('tempmin');
    let tempmaxElement=document.getElementById('tempmax');
    let humidityElement=document.getElementById('humidity');
    let cityHeader=document.getElementById('cityHeader');
    let weathericon=document.getElementById('documentIconImg');
    weathericon.src='http://openweathermap.org/img/w/'+resultfromServer.weather[0].icon+'.png';
    let resultDescription=resultfromServer.weather[0].description;
    weatherDescriptionHeader.innerText=resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
    temperatureElement.innerHTML=Math.floor(resultfromServer.main.temp)+'&#176';
    tempminElement.innerHTML='Minimum: '+resultfromServer.main.temp_min+'&#176';
    tempmaxElement.innerHTML='Maximum: '+resultfromServer.main.temp_max+'&#176';
    pressureElement.innerHTML='Pressure: '+resultfromServer.main.pressure+' atm';
    windSpeedElement.innerHTML='Windspeed: '+resultfromServer.wind.speed+' m/s';
    cityHeader.innerHTML=resultfromServer.name;
    humidityElement.innerHTML='Humidity levels at '+resultfromServer.main.humidity+'%';
    setPosition();
    console.log(resultfromServer);
}
function setPosition()
{
    let weatherContainer=document.getElementById('weatherContainer');
    let weatherContainerHeight=weatherContainer.clientHeight;
    let weatherContainerWidth=weatherContainer.clientWidth;
    weatherContainer.style.left=`calc(50% - ${weatherContainerWidth/2}px)`;
    weatherContainer.style.top=`calc(50% - ${weatherContainerHeight/2}px)`;
    weatherContainer.style.visibility = 'visible';
}
document.getElementById('searchBtn').addEventListener('click',()=>{
    let searchTerm=document.getElementById('searchInput').value;
    if (searchTerm)
        searchWeather(searchTerm);
})