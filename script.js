

async function setDefaultWheater() {
    let main_card_title = document.querySelector('#main-card .card-title');
    let main_card_temperature = document.querySelector('#main-card .temperature');
    let main_card_sub_info = document.querySelector('#main-card .sub-info');



    const data = await axios.get('http://dataservice.accuweather.com/currentconditions/v1/110258/historical?apikey=dxDbkA6EfN8f83TwD1pEMSHhjCY9jBZO&details=true&language=pt-br')
    .then(response => {
        console.log(response.data);
        main_card_title.innerHTML = response.data[0].WeatherText;
        main_card_temperature.innerHTML = `${response.data[0].Temperature.Metric.Value} °C`;
        main_card_sub_info.innerHTML = `

        Umidade: ${response.data[0].IndoorRelativeHumidity}%
        Vento: ${response.data[0].Wind.Speed.Metric.Value}km/h
        `;
});


}

setDefaultWheater();