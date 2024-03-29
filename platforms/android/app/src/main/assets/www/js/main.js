// week 6 - weinre for testing phonegap applications.

// https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-dialogs/

// references
//https://stackoverflow.com/questions/9475830/google-maps-api-v3-markers-all-share-the-same-infowindow
//https://developers.google.com/maps/documentation/javascript/places


// Variables
var map;
var service;
var onlineConnection = window.navigator.onLine;
var currentPosition, point;
var infowindow;
var places = [];
//var markers = xml.documentElement.getElementsByTagName("marker");
var pictureSource, pictureDestination;
var cameraOptions = {
  quality: 50,
  destinationType: Camera.destinationType.DATA_URL,
  sourceType: Camera.PictureSource.SAVEDPHOTOALBUM,
  popoverOptions: popover
}

document.addEventListener("deviceready", onDeviceReady, false);

 function onDeviceReady() {
     console.log("onDeviceReady: device ready.");
     initialise();
     document.getElementById("takePicture").addEventListener("click", cameraTakePicture);
     document.getElementById("takeVideo").addEventListener("click", videoCapture);
     navigator.geolocation.getCurrentPosition(onSuccess, onError);
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
    // var trackingID = '';
    // var watchID = null;
    // var trackingData = [];

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
    //  var element = document.getElementById('geolocation');
     // point = current location.
     var point = new google.maps.LatLng(position.coords.latitude,
      position.coords.longitude);
    //var UOL = new google.maps.LatLng(53.230, 0.5400);

    map = new google.maps.Map(
        document.getElementById('mapCanvas'), {
          zoom: 15,
          center: point
        });

    // change current marker icon.

    var request = {
      location: point, radius: 1000, type: ['bar']
    };
    
   var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(
    request,
    function(results, status, pagination) {
      if (status !== 'OK') return;
      alert('Marker');
      createMarkers(results, point); // creates markers from query given from request.
    });
}

function bindInfoWindow(marker, map, infowindow, html) {
  marker.addListener('click', function() {
      infowindow.setContent(html);
      infowindow.open(map, this);
  });
}

// results passed through to create a marker.
function createMarkers(places, point) {
  var bounds = new google.maps.LatLngBounds();
  //var infowindow = new google.maps.InfoWindow(); // making new info window
  var place;
  infoWindowCurrentPlace = new google.maps.InfoWindow({
    content: 'you are here'
  })
  var currentMarker = new google.maps.Marker({
    position: point,
    map: map,
    title: 'You are here'
  });
  google.maps.event.addListener(currentMarker, 'click', function() {
    console.log(currentMarker);
            infoWindowCurrentPlace.open(map, this);
          });
  var infowindow = new google.maps.InfoWindow({
  });
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
      name: place.name,
      position: place.geometry.location
    });
    bindInfoWindow(marker, map, infowindow, marker.name); // used to add individual infoWindows.
    bounds.extend(place.geometry.location);
  }
  map.fitBounds(bounds);
}

// ---------- GOOGLE MAPS ---------------

function onError(error) {
    alert('code: '    + error.code    + '\n' +
    'message: ' + error.message + '\n');
}

// function initMap() {
//   var sydney = new google.maps.LatLng(-33.867, 151.195);

//   infowindow = new google.maps.InfoWindow();

//   map = new google.maps.Map(
//       document.getElementById('map'), {center: sydney, zoom: 15});


// }

// ---------- CAMERA API ----------------

function cameraTakePicture() {
  navigator.camera.getPicture(cameraSuccess, cameraError, cameraOptions);


  function cameraSuccess(imageData) {
    var image = document.getElementById('myImage');
    image.src = "data:image/jpeg;base64" + imageData; // data type.
  }

  function cameraError() {
    alert('camera exit or failure');
  }
}

// ---------- CAMERA API ----------------

// ---------- VIDEO API ----------------
//https://www.tutorialspoint.com/cordova/cordova_media_capture.htm


function videoCapture() {
  var options = {
     limit: 1,
     duration: 10
  };
  navigator.device.capture.captureVideo(onSuccess, onError, options);

  function onSuccess(mediaFiles) {
     var i, path, len;
     for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        path = mediaFiles[i].fullPath;
        console.log(mediaFiles);
     }
  }

  function onError(error) {
     navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
  }
}

// ---------- VIDEO API ----------------