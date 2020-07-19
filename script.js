function setMainCardWheater (data) {
    console.log(data);
    let main_card_title = document.querySelector('#main-card .card-title');
    let main_card_temperature = document.querySelector('#main-card .temperature');
    let main_card_sub_info = document.querySelector('#main-card .sub-info');

    main_card_title.innerHTML = data.WeatherText;
    main_card_temperature.innerHTML = `${data.Temperature.Metric.Value} °C`;
    main_card_sub_info.innerHTML = `
        Umidade: ${data.IndoorRelativeHumidity}%<br>
        Vento: ${data.Wind.Speed.Metric.Value}km/h
        `;

}

function setWeeklyForecast (data) {
    console.log(data);
    let forecast_day = document.querySelectorAll('.forecast-day');
    let forecast_icon = document.querySelectorAll('.forecast-icon');
    let forecast_text = document.querySelectorAll('.forecast-text');
    console.log(forecast_text);
    
    data.forEach((forecast, index) => {
        forecast_text[index].innerHTML = forecast.Day.ShortPhrase;
    })


}

async function setDefaultWheater() {
    
    await axios.get('http://dataservice.accuweather.com/currentconditions/v1/110258/historical?apikey=dxDbkA6EfN8f83TwD1pEMSHhjCY9jBZO&details=true&language=pt-br')
    .then(response => {
        setMainCardWheater(response.data[0]);
    })
        
        
    await axios.get('http://dataservice.accuweather.com/forecasts/v1/daily/5day/110258?apikey=dxDbkA6EfN8f83TwD1pEMSHhjCY9jBZO&details=true&language=pt-br')
    .then(response => {
        setWeeklyForecast(response.data.DailyForecasts);
    })


};

setDefaultWheater();