// week 6 - weinre for testing phonegap applications.

// https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-dialogs/

// Variables
var onlineConnection = window.navigator.onLine;
var currentPosition, point;
var map;
var service;
var infowindow;
var pictureSource, pictureDestination;
var cameraOptions = {
  quality: 50,
  destinationType: Camera.destinationType.DATA_URL
}

document.addEventListener("deviceready", onDeviceReady, false);

 function onDeviceReady() {
     console.log("onDeviceReady: device ready.");
     initialise();
     navigator.geolocation.getCurrentPosition(onSuccess, onError);
     document.getElementById("takePicture").addEventListener("click", cameraTakePicture);
     // maybe add cleanup option in case it gets to cluttered for when viewing pictures on app? camera.Cleanup();
}

$(document).ready(function () {
    console.log(".ready: ready")
    initialise();
    
});

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

// ---------- GOOGLE MAPS ---------------

// ---------- CAMERA API ----------------

function cameraTakePicture() {
  navigator.camera.getPicture(cameraSuccess, cameraError, cameraOptions);

  function cameraSuccess(imageData) {
    var image = document.getElementById('myImage');
    image.src = "data:image/jpeg;base64" + imageData; // data type.
  }
  
  function cameraError() {

  }
}

// ---------- CAMERA API ----------------