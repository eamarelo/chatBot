# chatBot

## Introduction
Welcome in the repository of the amazing chatBot by echo.
This is a simple chat where you can instanciate different bot

## Pré-requis

install `nodejs` & `npm`

## Comment l'utiliser
Clone this repository to your local storage:
`git clone https://github.com/eamarelo/chatBot.git`
<br>
and install dependencies:
`npm i`
<br>
Run the project to http://localhost:8080/ :
`npm run start`

## API USED


### Google Maps

URI : https://developers.google.com/maps/documentation/?hl=fr

### Carrefour

URI : https://developer.fr.carrefour.io

### Uber

URI : https://developer.uber.com/

### Youtube

URI : https://developers.google.com/youtube

### Ipify

URI : https://www.ipify.org/

### openweathermap

URI : https://openweathermap.org/api

### Google GeoCoding

URI : https://developers.google.com/maps/documentation/geocoding


## Utilisation Bots

  * youtube: /youtube [nom_de_la_video]  
display videos of the first pages of your search

  * uber: /uber [nom_de_la_destination]  
display different offers for your destination

  * meteo: /meteo [nom_de_la_ville]  
display temperature and humidity

  * ip: /ip 
display your ip

  * carrefour: /carrefour  
display supermarket carrefour around your position (10km)

### Skeleton file

```
const request = require('request');

module.exports = class YourNameBot{
  constructor (param) {
    this.param = param;
  }

  init (callback) {
    var options = {
      'method': '',
      'url': ''
    };

    request(options, (error, response, body) => {
      if (error) {
        return console.error('Failed: %s', error.message);
      }

      console.log('succes ' + body);
      callback(body);
      return body;
    });
  }

  echo () {
    var sync = true;

    this.init(result => {
      this.setJson(result);
      sync = false;
    });
    while (sync) {
      require('deasync').sleep(100);
    }
  }

  setJson (json) {
    this.json = JSON.parse(json);
  }
  
  getJson () {
    return this.json;
  }
};


```


