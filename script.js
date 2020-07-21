function setMainCardWheater (data) {
    let main_card_title = document.querySelector('#main-card .card-title');
    let main_card_icon = document.querySelector('#main-card .wheater-icon');
    let main_card_temperature = document.querySelector('#main-card .temperature');
    let main_card_sub_info = document.querySelector('#main-card .sub-info');

    main_card_title.innerHTML = data.WeatherText;
    main_card_icon.src = `svg/${data.WeatherIcon}.svg`;
    main_card_temperature.innerHTML = `${data.Temperature.Metric.Value} °C`;
    main_card_sub_info.innerHTML = `
        Umidade: ${data.IndoorRelativeHumidity}%<br>
        Vento: ${data.Wind.Speed.Metric.Value}km/h
        `;

}

function setWeeklyForecast (data) {
    let forecast_day = document.querySelectorAll('.forecast-day');
    let forecast_icon = document.querySelectorAll('.forecast-icon');
    let forecast_text = document.querySelectorAll('.forecast-text');
    console.log(forecast_text);
    
    data.forEach((forecast, index) => {
        forecast_text[index].innerHTML = forecast.Day.ShortPhrase;
        forecast_day[index].innerHTML = forecast.Date.slice(8, 10);
        forecast_icon[index].src = `svg/${forecast.Day.Icon}.svg`;
    })


}

function setDailyForecast (data) {
    console.log(data);
    let forecast_icon = document.querySelectorAll('.daily-forecast .wheater-icon');
    let forecast_text = document.querySelectorAll('.daily-forecast .card-text');

    forecast_icon[0].src = `svg/${data.Day.Icon}.svg`;
    forecast_icon[1].src = `svg/${data.Night.Icon}.svg`;

    forecast_text[0].innerHTML = data.Day.IconPhrase;
    forecast_text[1].innerHTML = data.Night.IconPhrase;

    
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

    await axios.get('http://dataservice.accuweather.com/forecasts/v1/daily/1day/110258?apikey=dxDbkA6EfN8f83TwD1pEMSHhjCY9jBZO&details=true&language=pt-br')
    .then(response => {
        setDailyForecast(response.data.DailyForecasts[0]);
    })


};

setDefaultWheater();