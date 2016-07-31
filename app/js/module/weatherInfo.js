"use strict";

var Weather = require('./weather.js');

var WeatherInfo = function (location, temp, descrip) {
  Weather.apply(this, arguments);
}

WeatherInfo.prototype = Object.create(Weather.prototype);

WeatherInfo.prototype.renderInfo = function (respond) {
  this.locEl.innerHTML = respond.name + ', ' + respond.sys.country;
  this.tempEl.innerHTML = Math.round(respond.main.temp - 272.15);
  this.descripEl.innerHTML = respond.weather[0].description;
};

WeatherInfo.prototype.toggleScale = function (event, celsius, fahrenheit) {
  var target = event.target;
  var value = this.tempEl.innerHTML;
  if (target.className == fahrenheit.className) {
    this.tempEl.innerHTML = Math.round(value * 1.8 + 32);
    fahrenheit.className += ' active';
    celsius.className = celsius.className.replace(/(?:^|\s)active(?!\S)/ , '');
  } else if (target.className == celsius.className) {
    this.tempEl.innerHTML = Math.round((value - 32) / 1.8);
    celsius.className += ' active';
    fahrenheit.className = fahrenheit.className.replace(/(?:^|\s)active(?!\S)/ , '');
  }
};

module.exports = WeatherInfo;
