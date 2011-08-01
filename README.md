# PlistToJson

A Javascript library for converting .PLIST files to JSON objects with Titanium API.

Created by:

* Codeboxed - <team@codeboxed.com>

Based on code originaly wrote by Ben Sandofsky https://github.com/sandofsky/plist-to-json

## Usage

	Ti.include('plist-to-json.js');
	
	var goodFilePath = 'simple_example.plist';
	var badFilePath = 'simple_example_bad_path.plist';
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
	
	var runBadFilePath = plistToJson.run(badFilePath);
	
	var testValidJsonObject = plistToJson.testFile(goodFilePath);
	
	var testValidJsonString = plistToJson.testString(validXMLString);

## Notes
* If you have any suggestions or bug reports, open a GitHub Issue.