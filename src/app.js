/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var ajax = require('ajax');
var UI = require('ui');
var Vector2 = require('vector2');


var baseurl = 'https://query.yahooapis.com/v1/public/yql';
var query = 'select wind from weather.forecast where woeid="29375164"';

var results;

ajax(
  {
    url: baseurl + '?q=' + encodeURIComponent(query) + '&format=json',
    type: 'json'
  },
  function(data) {
    console.log('SUCESS: ' + data.query.results.channel.wind.speed);
    for (var prop in data.query) {
      if( data.query.hasOwnProperty( prop ) ) {
        console.log("o." + prop + " = " + data.query[prop]);
      }
    } 
    results = data;
  },
  function(error) {
    console.log('ERROR: ' + error);
    results = error;
  }
);

var main = new UI.Card({
  title: 'FlyPebble',
  icon: 'images/menu_icon.png',
  body: 'hello'
});

main.show();

main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Pebble.js',
        icon: 'images/menu_icon.png',
        subtitle: 'Can do Menus'
      }, {
        title: 'Second Item',
        subtitle: 'Subtitle Text'
      }]
    }]
  });
  menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  });
  menu.show();
});

main.on('click', 'select', function(e) {
  var wind = new UI.Window();
  var textfield = new UI.Text({
    position: new Vector2(0, 50),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Text Anywhere!',
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
});

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Pebble.js.');
  card.show();
});
