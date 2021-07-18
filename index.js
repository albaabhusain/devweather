const cityForm = document.querySelector('form');
const cityInfo = document.querySelector('.info');
const bimg= document.querySelector('.disp-img') ;
const det = document.querySelector('.det')
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

//update ui

const updateUI = (data)=>{

    //visible data

    det.classList.remove('d-none');
    
    // ui

   const city = data.details;
  const  weather=data.weather;
  

    cityInfo.innerHTML=`
    <h1 class="city-head my-4 ">${city.EnglishName}</h1>
            <p>${city.AdministrativeArea.LocalizedName}</p>
           
            <div class="temp-info my-4">
             <span >${weather.Temperature.Metric.Value}</span>
             <span>&deg;C</span>
             </div>
             <div class="my-4 f-2em">${weather.WeatherText}</div>
    `
    let isrc=null;
    if(weather.IsDayTime){
        isrc='img/day.svg'

    }
    else
    isrc='img/night.svg';

    time.setAttribute('src',isrc);

    let icsrc= `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src',icsrc);

    $(window).scrollTo('#content', 200);

};



//update city info search
const updateCity = async (city)=>{

    const cityDet= await getCity(city);
    const cityWeather= await getWeather(cityDet.Key);
    console.log(cityDet);
    return {
        details: cityDet,
        weather: cityWeather
    };

};


//submit event

cityForm.addEventListener('submit', e =>{

    //prevent default
    e.preventDefault();

    //get city name 

    const city = cityForm.city.value.trim();
    cityForm.reset();
 
    //update ui

    updateCity(city)
    .then(data=> updateUI(data))
    .catch(err => console.log(err));

    
    




})