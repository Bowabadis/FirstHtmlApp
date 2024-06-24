let text = document.getElementById('text');
let leaf = document.getElementById('leaf');
let hill1 = document.getElementById('hill1');
let hill4 = document.getElementById('hill4');
let hill5 = document.getElementById('hill5');
let hill2 = document.getElementById('hill2');
let hill3 = document.getElementById('hill3');

window.addEventListener('scroll', () => {
    let value = window.scrollY;

    text.style.marginTop = value * 1.5 + 'px';
    leaf.style.top = value * -1.2+ 'px';
    leaf.style.left = value * 1+ 'px';
    hill5.style.left = value * 0.5 + 'px';
    hill4.style.left = value * -0.5 + 'px';
    hill1.style.top = value * 0.4 + 'px';
    hill2.style.left = value * -0.05 + 'px';
    hill2.style.top = value * 0.2 + 'px';
    hill3.style.left = value * 0.05 + 'px';
    hill3.style.top = value * 0.3 + 'px';
})

const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIKey = '33b1bfd445e2d9759fda99f7e2c50994';
    const city = document.querySelector('.search-box input').value;

    if(city == '')
        return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`).then(response => response.json()).then(json => {
        
        if(json.cod == '404'){
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }
        container.style.height = '555px';
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');
        
        const image = document.querySelector('.weather-box i');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch(json.weather[0].main){
            case 'Clear':
                image.className = 'bx bx-sun';
                break;
            case 'Rain':
                image.className = 'bx bx-cloud-rain';
                break;
            case 'Snow':
                image.className = 'bx bx-cloud-snow';
                break;
            case 'Clouds':
                image.className = 'bx bx-cloud';
                break;
            case 'Mist':
                image.className = 'bx bx-cloud-drizzle';
                break;
            case 'Haze':
                image.className = 'bx bx-cloud-drizzle';
                break;
            default:
                image.className = 'bx bxs-message-alt-x';
                break;
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°F</span>`;
        const desc = `${json.weather[0].description}`;
        const finalSentence = desc.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

        description.innerHTML = finalSentence;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}MPH`;
    })
})

const showPopup = document.querySelector('.show-popup');
const popupContainer = document.querySelector('.popup-container');
const closeBtn = document.querySelector('.close-btn');

showPopup.onclick = () => {
    popupContainer.classList.add('active');
}
closeBtn.onclick = () => {
    popupContainer.classList.remove('active');
}
