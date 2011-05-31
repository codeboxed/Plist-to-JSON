/**
* Class name: PlistToJson
* Author: Codeboxed
* URL: http://www.codeboxed.com
* Date: May 10, 2011
* Platform: Titanium
*/

var PlistToJson = function() {
	/**
	 * Goes recursively through the DOM elements.
	 * @param {DOM Element} The XML document.
	 * @return {object|string|array|boolean} DOM Element.
	 * @private
	 */
	var jsonify_ = function (tag) {
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
						d[key] = jsonify_(nodes.item(i));
					}
				}
				return d;
			break;
			case 'array':
				var a = [];
				var nodes = tag.childNodes;
				for(var i = 0; i < nodes.length; i++){
					if (nodes.item(i).nodeName != "#text") {
						a.push(jsonify_(nodes.item(i)));
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
	
	/**
	 * Traverses the XML tree.
	 * @param {Ti.XML.DOMDocument} The XML document.
	 * @return {object} JSON object representation
	 * 		of the PLIST file. 
	 * @private
	 */
	var traverse_ = function(xmlResult) {
		// Get parent tag ('<plist>')
		var doc = xmlResult.getElementsByTagName('plist').item(0).childNodes;
		
		// Iterate through parent tag childs 
		for(var i = 0, b = doc.length; i < b; i++) {
			if (doc.item(i).nodeName != "#text") {
				return jsonify_(doc.item(i));
			}
		}
	};
	
	/**
	 * Opens the filePath and starts the parsing.
	 * @param {string} Relative path to the file.
	 * @return {object|null} JSON object representation
	 * 		of the PLIST file. 
	 * @private
	 */
	var parse_ = function(filePath) {
		var file = Ti.Filesystem.getFile(filePath);
		
		if (file.exists()) {
			var xmlResultBlob = file.read();		
			var xmlResultText = xmlResultBlob.toString();
			var xmlResult = Ti.XML.parseString(xmlResultText);
		
			return traverse_(xmlResult);
		} else {
			Ti.API.error('Filename: ' + file.getNativePath() + ' does not exists');
		}
		
		return null;
	};
	
	return {
		/**
		 * Parses the PLIST file and returns the result.
		 * @param {string} Relative path to the file.
		 * @return {object|null} JSON object representation
		 * 		of the PLIST file. 
		 * @public
		 */
		run: function(filePath) {
			if (filePath !== undefined) {
				return parse_(filePath);
			} else {
				Ti.API.error('{Object}.run() must receive the relative file path as an argument');
			}
		},
		
		/**
		 * Parses the PLIST file, returns and 
		 * 	 	echos the result.
		 * @param {string} Relative path to the file.
		 * @return {object|null} JSON object representation
		 * 		of the PLIST file.
		 * @public
		 */
		testFile: function(filePath) {
			if (filePath !== undefined) {
				var testResult = parse_(filePath);
				
				if (testResult !== null) {
					Ti.API.info(testResult);
					
					return testResult;
				} else {
					Ti.API.error('Test failed!');
				}
			} else {
			 	Ti.API.error('{Object}.testFile() must receive the relative file path as an argument');
			}
			
			return null;
		},
		
		/**
		 * Parses the XML string, returns and 
		 * 	 	echos the result.
		 * @param {string} Valid XMl string.
		 * @return {object|null} JSON object representation
		 * 		of the XML string.
		 * @public
		 */
		testString: function(XMLString) {
			if (XMLString !== undefined) {	
				var xmlResult = Ti.XML.parseString(XMLString);
				
				var testResult = traverse_(xmlResult);
				
				Ti.API.info(testResult);
					
				return testResult;
			} else {
				Ti.API.error('{Object}.testString() must receive a valid XML string as an argument');
			}
			
			return null;
		}
	}
};