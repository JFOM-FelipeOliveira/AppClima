const container = document.querySelector('.container');
const pesquisa = document.querySelector('.pesquisa-box button');
const climaBox = document.querySelector('.clima-box');
const climaDetalhes = document.querySelector('.clima-detalhes');
const erro404 = document.querySelector('.not-found');

pesquisa.addEventListener('click', () =>{
    const APIKey = 'f13234fc688d1400253ca502e3702157';
    const city = document.querySelector('.pesquisa-box input').value;

    if(city === '')
        return;
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json()).then(json => {

        if(json.cod === '404'){
            container.style.height = '400px';
            climaBox.style.display = 'none';
            climaDetalhes.style.display = 'none';
            erro404.style.display = 'block';
            erro404.classList.add('fadeIn');
            return;
        }

        erro404.style.display = 'none';
        erro404.classList.remove('fadeIn');

        const image = document.querySelector('.clima-box img');
        const temperatura = document.querySelector('.clima-box .temperatura');
        const descricao = document.querySelector('.clima-box .descricao');
        const humidade = document.querySelector('.clima-detalhes .humidade span');
        const wind = document.querySelector('.clima-detalhes .wind span');
        
        switch(json.weather[0].main){
            case 'Clear':
                image.src = 'images/clear.png';
                break;
            
            case 'Rain':
                image.src = 'images/rain.png';
                break;

            case 'Snow':
                image.src = 'images/snow.png';
                break;
            case 'Clouds':
                image.src = 'images/cloud.png';
                break;
            case 'Haze':
                image.src = 'images/haze.png';
                break;
            
            default:
                image.src = '';
            
        }

        temperatura.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        descricao.innerHTML = `${json.weather[0].description}`;
        humidade.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed * 3.6)}Km/h`;

        climaBox.style.display = '';
        climaDetalhes.style.display = '';
        climaBox.classList.add('fadeIn');
        climaDetalhes.classList.add('fadeIn');
        container.style.height = '590px';

    });

});