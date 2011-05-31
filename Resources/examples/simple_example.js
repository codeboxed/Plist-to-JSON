/*
   simple_example.js
   Plist-to-JSON
   
   Created by Codeboxed on 2011-05-16.
*/

var win = Ti.UI.currentWindow;

Ti.include('../plist-to-json.js');

var goodFilePath = 'plists/simple_example.plist';
var wrongFilePath = 'simple_example.plist';
var validXMLString = '<?xml version="1.0" encoding="utf-8"?><plist version="1.0"> <array>' +
					 '<dict> <key>title</key> <string>The Caledonian Brewery</string>' +
					 '<key>image</key> <string>wl-cal-brewery.jpg</string> <key>weblink</key>' +
					 '<string>http://www.caledonian-brewery.co.uk</string> </dict> <dict> ' +
					 '<key>title</key> <string>The Scotch Whisky Experience</string>' +
					 '<key>image</key> <string>wl-scottish-whisky.jpg</string> <key>weblink</key> ' +
					 '<string>http://www.whisky-heritage.co.uk</string> </dict> </array> </plist>'; 

// Init the PlistToJson class
var plistToJson = new PlistToJson();

// Tests
var runValidJsonObject = plistToJson.run(goodFilePath);

Ti.API.info(runValidJsonObject);

var runNoParam = plistToJson.run();

var runWrongFilePath = plistToJson.run(wrongFilePath);

Ti.API.info('--------------');

var testValidJsonObject = plistToJson.testFile(goodFilePath);

var testValidJsonString = plistToJson.testString(validXMLString);

alert('Check the project log to see the results...');
