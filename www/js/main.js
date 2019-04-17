// phoneGap js code specific - "device ready"
// browser js specific - "$(document).ready"

// this is phonegap specific 
document.addEventListener("deviceready", setup, false);
// https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-dialogs/
// function onDeviceReady() {

// }



function setup() { 
    navigator.notification.alert('You are the winner!', // message 
    alertDismissed, // callback 
    'Game Over', // title 
    'Done' // buttonName
    );
};

// Jquery example.
// $ defines JQuery code.
//$('selector').action();

// hides current element
// $(this).hide();
// hides the element called.
//$('body').hide();
//$(#id).hide();
//$(.class).hide();




// deviceReady - not fired on a browser.