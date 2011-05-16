var win = Ti.UI.currentWindow;

var examplesData = [
	{
		title: 'Simple example',
		hasChild:true,
		child:'simple_example.js'
	}
];

var examplesTable = Ti.UI.createTableView({
	data: examplesData
});

examplesTable.addEventListener('click', function(e) {
	var win = Ti.UI.createWindow({
		url: 'examples/' + e.rowData.child,
		title: e.rowData.title,
	});
	
	Ti.UI.currentTab.open(win, {animated:true});
});

win.add(examplesTable);
