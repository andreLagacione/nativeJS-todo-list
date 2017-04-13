window.onload = function loadWindow() {
	var now = new Date();
	getDateDate(now);
	getHour(now);
};

function actionsSidebarMenu(item) {
	var categories = document.querySelectorAll('#main-menu > ul > li'),
		hasClass = item.className.split(' '),
		allIconIndicator = document.querySelectorAll('.icon-sub-category i'),
		iconIndicatorItem = item.querySelectorAll('.icon-sub-category i');

	for (var i = 0; i < categories.length; i++) {
		categories[i].classList.remove('active');
	}

	for (var i = 0; i < allIconIndicator.length; i++) {
		allIconIndicator[i].classList.remove('fa-chevron-down');
		allIconIndicator[i].classList.add('fa-chevron-right');
	}

	for (var i = 0; i < hasClass.length; i++) {
		if (hasClass[i] == 'active') {
			item.classList.remove('active');
			iconIndicatorItem[0].classList.remove('fa-chevron-down');
			iconIndicatorItem[0].classList.add('fa-chevron-right');
			break;
		} else {
			item.classList.add('active');
			iconIndicatorItem[0].classList.remove('fa-chevron-right');
			iconIndicatorItem[0].classList.add('fa-chevron-down');
		}
	}
};

function getDateDate(now) {
	var day = now.getDate(),
		month = now.getMonth() + 1,
		year = now.getFullYear();

	if (day < 10) day = '0' + day;
	if (month < 10) month = '0' + month;

	document.getElementById('day').innerHTML = day + '/' + month + '/' + year;
};

function getHour(now) {
	setInterval(function() {
		var hour = now.getHours(),
		minute = now.getMinutes(),
		seconds = now.getSeconds();

	if (hour < 10) hour = '0' + hour;
	if (minute < 10) minute = '0' + minute;
	if (seconds < 10) seconds = '0' + seconds;

	document.getElementById('hour').innerHTML = hour + ':' + minute + ':' + seconds;
	}, 1000);
};