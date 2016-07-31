"use strict";

var Weather = require('./weather.js');

var WeatherIcon = function (container) {
  this.iconContainer = container;
  this.iconElements = {
    cloudy: '<div class="cloud"></div><div class="cloud"></div>',
    sunShower:'<div class="cloud"></div><div class="sun"><div class="rays"></div></div><div class="rain"></div>',
    thunderStorm: '<div class="cloud"></div><div class="lightning"><div class="bolt"></div><div class="bolt"></div></div>',
    flurries: '<div class="cloud"></div><div class="snow"><div class="flake"></div><div class="flake"></div></div>',
    sunny: '<div class="sun"><div class="rays"></div></div>',
    rainy: '<div class="cloud"></div><div class="rain"></div>',
    notFound: '<p>Image not found</p>'
  };
}

WeatherIcon.prototype = Object.create(Weather.prototype);

WeatherIcon.prototype.renderImg = function (respond) {
  switch (respond.weather[0].main) {
    case 'Clouds':
      this.iconContainer.className += ' cloudy';
      this.iconContainer.innerHTML = this.iconElements.cloudy;
      break;
    case 'Clear':
      this.iconContainer.className += ' sunny';
      this.iconContainer.innerHTML = this.iconElements.sunny;
      break;
    case 'Rain':
      this.iconContainer.className += ' rainy';
      this.iconContainer.innerHTML = this.iconElements.rainy;
      break;
    case 'Snow':
      this.iconContainer.className += ' flurries';
      this.iconContainer.innerHTML = this.iconElements.flurries;
      break;
    default:
      this.iconContainer.innerHTML = this.iconElements.notFound;
  }
};

module.exports = WeatherIcon;
