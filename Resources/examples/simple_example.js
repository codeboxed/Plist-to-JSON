/*
   simple_example.js
   Plist-to-JSON
   
   Created by Codeboxed on 2011-05-16.
*/

var win = Ti.UI.currentWindow;

Ti.include('../plist_to_json.js');

var array = plist_to_json('plists/simple_example.plist');

Ti.API.info(array);

alert('Check the log...');
