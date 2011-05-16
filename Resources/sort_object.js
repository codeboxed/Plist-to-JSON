var sortObject = function(o, exclude) {
    var sorted = {},
    key, a = [];

    for (key in o) {
        if (o.hasOwnProperty(key)) {
                a.push(key);
        }
    }

    a.sort(function(a, b) {
    	if (a != exclude && b != exclude) {
    		return parseInt(a) > parseInt(b) ? 1 : -1;
    	}
    });

    for (key = 0, b = a.length; key < b; key++) {
        sorted[a[key]] = o[a[key]];
    }
    return sorted;
};