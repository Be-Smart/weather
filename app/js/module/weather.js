"use strict";

var Weather = function (location, temp, descrip) {
  this.locEl = location;
  this.tempEl = temp;
  this.descripEl = descrip;
};

Weather.prototype.getWeather = function (link, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var data = JSON.parse(xhr.responseText);
      callback(data);
    }
  }
  xhr.open('GET', link, true);
  xhr.send();
};

module.exports = Weather;
