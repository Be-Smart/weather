"use strict";

//Cache the DOM
var locationEl = document.getElementsByClassName('weather__location')[0];
var temperatureEl = document.getElementsByClassName('weather__number')[0];
var descriptionEl = document.getElementsByClassName('weather__description')[0];
var temp = document.getElementsByClassName('weather__temperature')[0];
var fahrenheit = document.getElementsByClassName('weather__fahrenheit')[0];
var celsius = document.getElementsByClassName('weather__celsius')[0];
var icon = document.getElementsByClassName('icon')[0];

//Markup for icons
var weatherIcons = {
  cloudy: '<div class="cloud"></div><div class="cloud"></div>',
  sunShower:'<div class="cloud"></div><div class="sun"><div class="rays"></div></div><div class="rain"></div>',
  thunderStorm: '<div class="cloud"></div><div class="lightning"><div class="bolt"></div><div class="bolt"></div></div>',
  flurries: '<div class="cloud"></div><div class="snow"><div class="flake"></div><div class="flake"></div></div>',
  sunny: '<div class="sun"><div class="rays"></div></div>',
  rainy: '<div class="cloud"></div><div class="rain"></div>'
};

//Toggle between celsius and fahrenheit
function toggleTempScale(e) {
  var target = e.target;
  var value = temperatureEl.innerHTML;
  if (target.className == 'weather__fahrenheit') {
    temperatureEl.innerHTML = Math.round(value * 1.8 + 32);
    fahrenheit.className += ' active';
    celsius.className = 'weather__celsius';
  } else if (target.className == 'weather__celsius') {
    temperatureEl.innerHTML = Math.round((value - 32) / 1.8);
    celsius.className += ' active';
    fahrenheit.className = 'weather__fahrenheit';
  }
}

//Handle AJAX request
function getWeather(callback) {
  var link = 'http://api.openweathermap.org/data/2.5/weather?lat=51.24&lon=33.2&APPID=92febc9cb6d73da4dacef2636a9ecef7';
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var data = JSON.parse(xhr.responseText);
      callback(data);
    }
  }
  xhr.open('GET', link, true);
  xhr.send();
}

//Render weather data to HTML
function renderInfo(res) {
  locationEl.innerHTML = res.name + ', ' + res.sys.country;
  temperatureEl.innerHTML = Math.round(res.main.temp - 272.15);
  descriptionEl.innerHTML = res.weather[0].description;
}

//Render weather icon to HTML
function renderIcon(res) {
  switch (res.weather[0].main) {
    case 'Clouds':
      icon.className += ' cloudy';
      icon.innerHTML = weatherIcons.cloudy;
      break;
    case 'Clear':
      icon.className += ' sunny';
      icon.innerHTML = weatherIcons.sunny;
      break;
    case 'Rain':
      icon.className += ' rainy';
      icon.innerHTML = weatherIcons.rainy;
      break;
    case 'Snow':
      icon.className += ' flurries';
      icon.innerHTML = weatherIcons.flurries;
      break;
    default:
      icon.innerHTML = '<p>Image not found</p>';
  }
}

//Events
document.addEventListener('DOMContentLoaded', function() {
  getWeather(renderInfo);
  getWeather(renderIcon);
});

temp.addEventListener('click', function(e) {
  toggleTempScale(e);
});
