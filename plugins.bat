@ECHO OFF
cls
rem ionic cordova platform remove android
ionic cordova platform add android
ionic cordova plugin add cordova-plugin-splashscreen
ionic cordova plugin add cordova-plugin-console
cordova plugin add cordova-plugin-whitelist --save
ionic cordova plugin add cordova-plugin-statusbar --save
ionic cordova plugin add cordova-sqlite-storage
ionic cordova plugin add cordova-plugin-screen-orientation
ionic cordova plugin add cordova-plugin-network-information
ionic cordova plugin add cordova.plugins.diagnostic
ionic cordova plugin add cordova-plugin-inappbrowser
ionic cordova plugin add cordova-plugin-x-socialsharing
ionic cordova plugin add cordova-plugin-app-preferences
ionic cordova plugin add cordova-plugin-device
ionic cordova plugin add cordova-plugin-fcm
npm install ionic-select-searchable --save
ionic cordova plugin add com-sarriaroman-photoviewer
ionic cordova plugin add cordova-plugin-camera
ionic cordova plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="AIzaSyB3cSNS5a1cCiWjEsCRGxpK34j0vt8G-ZI" --variable API_KEY_FOR_IOS="AIzaSyB3cSNS5a1cCiWjEsCRGxpK34j0vt8G-ZI"
ionic cordova plugin add cordova-plugin-geolocation
npm i cordova-plugin-google-services