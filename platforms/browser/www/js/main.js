// week 6 - weinre for testing phonegap applications.

// https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-dialogs/

document.addEventListener("deviceready", onDeviceReady, false);

 function onDeviceReady() {
     console.log("onDeviceReady: device ready.");
     initialise();
     navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

$(document).ready(function () {
    console.log(".ready: ready")
    initialise();
    
});

// Variables
var onlineConnection = window.navigator.onLine;
var currentPosition, point;
var map;
var service;
var infowindow;

// Functions
// ---------- IF ONLINE OR OFFLINE ------------
function initialise() {
  document.addEventListener("online", onOnline, false);
  document.addEventListener("offline", onOffline, false);

  if(window.navigator.onLine) {
      $('body').addClass('online');
      console.log("online")
  }
  else {
      $('body').addClass('offline');
      console.log("offline");
  }
}

function onOffline() {
$('body').addClass('offline');
$('body').removeClass('online');
}

function onOnline() {
$('body').removeClass('offline'); // remove the error no connection page.
$('body').addClass('online'); // add the online content.
}
// ---------- IF ONLINE OR OFFLINE ------------

function setup() { 
    var trackingID = '';
    var watchID = null;
    var trackingData = [];

    // if the device is offline ...
    if(window.navigator.offLine) {
        $("#homeNetworkButton").text('No Internet Access').attr("data-icon", "delete").button('refresh');
    }
    else {
        console.log('online');
    }

    $('#clearStorageButton').on('click', function(event) {
        console.log('clear');

        // preventing the default action.
        event.preventDefault();

        // clearing local storage.
        window.localStorage.clear();
    })
};

// ------------ GOOGLE MAPS ---------------
// // https://developers.google.com/maps/documentation/javascript/examples/place-search
// --------- GETTING CURRENT LOCATION ----------

function onSuccess(position) {
     // this function is called when the location has successfully been called.
     var element = document.getElementById('geolocation');
     var point = new google.maps.LatLng(position.coords.latitude, 
      position.coords.longitude);
    //var UOL = new google.maps.LatLng(53.230, 0.5400);
    
    infowindow = new google.maps.InfoWindow();
  
    map = new google.maps.Map(
        document.getElementById('mapCanvas'), {
          zoom: 15,
          center: point
        });
  
    // change current marker icon.
    new google.maps.Marker({
      position: point,
      map: map,
      title: 'You are here'
    });
    var request = {
      location: point, radius: 500, type: ['bar']
    };
   var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(
    request,
    function(results, status, pagination) {
      if (status !== 'OK') return;
      alert('Marker');
      createMarkers(results);
     
    });

     // appending data to the geolocation id in html.
     element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
                         'Longitude: '          + position.coords.longitude             + '<br />' +
                         'Altitude: '           + position.coords.altitude              + '<br />' +
                         'Accuracy: '           + position.coords.accuracy              + '<br />' +
                         'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                         'Heading: '            + position.coords.heading               + '<br />' +
                         'Speed: '              + position.coords.speed                 + '<br />' +
                         'Timestamp: '          + new Date(position.timestamp)          + '<br />';
}

function onError(error) {
    alert('code: '    + error.code    + '\n' +
    'message: ' + error.message + '\n');
}

var map;
var service;
var infowindow;

function initMap() {
  var sydney = new google.maps.LatLng(-33.867, 151.195);

  infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(
      document.getElementById('map'), {center: sydney, zoom: 15});

 
}

function createMarkers(places) {
  var bounds = new google.maps.LatLngBounds();
  var placesList = document.getElementById('places');

  for (var i = 0, place; place = places[i]; i++) {
    var image = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    var marker = new google.maps.Marker({
      map: map,
      icon: image,
      title: place.name,
      position: place.geometry.location
    });
  
    bounds.extend(place.geometry.location);
  }
  map.fitBounds(bounds);
}
// --------- Search for near bars ------------------//
/*
function searchBars(point,map) {
  alert ('open search bar');
    infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(
      document.getElementById('map'), {center: point, zoom: 15});

  var request = {
    location: point,
    query: 'tourist attractions',
    radius: '2000'
   // fields: ['name', 'geometry'],
  };

  service = new google.maps.places.PlacesService(map);
alert('before loop');
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
       alert('create marker loop');
        createMarker(results[i]);
      }

      map.setCenter(results[0].geometry.location);
    }
    else{
      alert('Error with place service status' + status);
    }
  };



function createMarker(place) {
  alert('pointer place location');
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}*/

// --------- GETTING CURRENT LOCATION ----------



// function calcRoute(end) {
//   navigator.geolocation.getCurrentPosition(function(pos) {
//     var start = new google.maps.LatLng(pos.coords.latitiude,
//       pos.coords.longitude);

//     var request = {
//       origin: start,
//       destination: end,
//       travelMode: google.maps.TravelMode.DRIVING
//     };

//     directionsService.route(request, function(response, status) {

//       if (status == google.maps.DirectionsStatus.OK) {

//         directionsDisplay.setDirections(response);
//       } 
//       else alert("Directions request failed: " + status);
//     });
//   }, 
//   function(err) {
    
//     alert('ERROR(' + err.code + '): ' + err.message + " using default address (Baltimore, MD)");
    
//     var request = {
//       origin: "Baltimore, MD",
//       destination: end,
//       travelMode: google.maps.TravelMode.DRIVING
//     };

//     directionsService.route(request, function(response, status) {
//       if (status == google.maps.DirectionsStatus.OK) {
//         directionsDisplay.setDirections(response);
//       } 
//       else alert("Directions request failed: " + status);
//     });
//   });
// }