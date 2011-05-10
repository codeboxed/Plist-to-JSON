/*
   plist_to_json.js
   Plist-to-JSON
   
   Created by Codeboxed on 2011-05-10.
*/

var plist_to_json = function(fileName) {
	var jsonify = function (tag){
		switch(tag.nodeName){
			case 'dict':
				var d = {};
				var nodes = tag.childNodes;
				for(var i = 0; i < nodes.length; i++){
					if (nodes.item(i).nodeName == 'key') {
						var key = nodes.item(i).text;
						i++;
						while (nodes.item(i).nodeName == "#text") {
							i++;
						}
						d[key] = jsonify(nodes.item(i));
					}
				}
				return d;
			break;
			case 'array':
				var a = [];
				var nodes = tag.childNodes;
				for(var i = 0; i < nodes.length; i++){
					if (nodes.item(i).nodeName != "#text") {
						a.push(jsonify(nodes.item(i)));
					}
				}
				return a;
			break;
			
			case 'string':
				return tag.text;
			break;
			case 'data':
				return tag.text;
			break;
			case 'real':
				return tag.text;
			break;
			case 'integer':
				return tag.text;
			break;
			case 'true':
				return true;
			break;
			case 'false':
				return false;
			break;
		}
	};
	
	var file = Ti.Filesystem.getFile(fileName);
	var xmlResponseData = file.read();
	
	var xmlResponseText = xmlResponseData.toString();
	// TO DEBUG: var xmlResponseText = '<?xml version="1.0" encoding="utf-8"?><plist version="1.0"> <array> <dict> <key>title</key> <string>The Caledonian Brewery</string> <key>image</key> <string>wl-cal-brewery.jpg</string> <key>weblink</key> <string>http://www.caledonian-brewery.co.uk</string> </dict> <dict> <key>title</key> <string>The Scotch Whisky Experience</string> <key>image</key> <string>wl-scottish-whisky.jpg</string> <key>weblink</key> <string>http://www.whisky-heritage.co.uk</string> </dict> </array> </plist>';
	
	xmlDOM = Ti.XML.parseString(xmlResponseText);
	
	doc = xmlDOM.getElementsByTagName('plist').item(0).childNodes;
		
	for(var i = 0, b = doc.length; i < b; i++) {
		if (doc.item(i).nodeName != "#text") {
			return jsonify(doc.item(i));
		}
	}
};