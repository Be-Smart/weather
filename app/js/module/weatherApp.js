"use strict";

var WeatherInfo = require('./weatherInfo.js');
var WeatherIcon = require('./weatherIcon.js');

//Cache the DOM
var location = document.getElementsByClassName('weather__location')[0];
var temperature = document.getElementsByClassName('weather__number')[0];
var description = document.getElementsByClassName('weather__description')[0];
var tempContainer = document.getElementsByClassName('weather__temperature')[0];
var fahrenheit = document.getElementsByClassName('weather__fahrenheit')[0];
var celsius = document.getElementsByClassName('weather__celsius')[0];
var iconContainer = document.getElementsByClassName('icon')[0];

//Initialize new instances
var weatherInfo = new WeatherInfo(location, temperature, description);
var weatherIcon = new WeatherIcon(iconContainer);

//Store link to AJAX request
var link = 'http://api.openweathermap.org/data/2.5/weather?lat=51.24&lon=33.2&APPID=92febc9cb6d73da4dacef2636a9ecef7';

//Bind event listeners
document.addEventListener('DOMContentLoaded', function() {
  weatherInfo.getWeather(link, weatherInfo.renderInfo.bind(weatherInfo));
  weatherIcon.getWeather(link, weatherIcon.renderImg.bind(weatherIcon));
});

tempContainer.addEventListener('click', function(e) {
  weatherInfo.toggleScale(e, celsius, fahrenheit);
});

//Update weather every 15 min
setInterval(function() {
  weatherInfo.getWeather(link, weatherInfo.renderInfo.bind(weatherInfo));
  weatherIcon.getWeather(link, weatherIcon.renderImg.bind(weatherIcon));
},900000);
