window.onload = function loadWindow() {
	var now = new Date();
	getDateDate(now);
	getHour();

	setInterval(function() {
		getHour();
	}, 1000);

	var contentApplication = document.getElementById('glass'),
	    bodyTag = document.getElementsByTagName('body');

	contentApplication.addEventListener('click', function() {
		bodyTag[0].classList.remove('show-menu');
		bodyTag[0].classList.add('hide-menu');
		contentApplication.style.display = 'none';
	});
};

function actionsSidebarMenu(item) {
	var categories = document.querySelectorAll('#main-menu > ul > li'),
		hasClass = item.className.split(' '),
		allIconIndicator = document.querySelectorAll('.icon-sub-category i'),
		iconIndicatorItem = item.querySelectorAll('.icon-sub-category i'),
		itemSubcategoryList = item.querySelectorAll('.sub-category'),
		allSubcategariesList = document.querySelectorAll('.sub-category'),
		linksSubMenu = item.querySelectorAll('.sub-category > li'),
		heightSubcategory = linksSubMenu.length * 33;

	for (var i = 0; i < allSubcategariesList.length; i++) {
		allSubcategariesList[i].style.height = 0;
	}

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
			itemSubcategoryList[0].style.height = 0;
			iconIndicatorItem[0].classList.remove('fa-chevron-down');
			iconIndicatorItem[0].classList.add('fa-chevron-right');
			break;
		} else {
			item.classList.add('active');
			itemSubcategoryList[0].style.height = heightSubcategory + 'px';
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

function getHour() {
	var now = new Date(),
		hour = now.getHours(),
		minute = now.getMinutes(),
		seconds = now.getSeconds();

	if (hour < 10) hour = '0' + hour;
	if (minute < 10) minute = '0' + minute;
	if (seconds < 10) seconds = '0' + seconds;

	document.getElementById('hour').innerHTML = hour + ':' + minute + ':' + seconds;
};

function showMenuDetails() {
	document.getElementsByClassName('show-menu')[0].classList.add('showing');
	document.getElementsByClassName('show-menu')[0].classList.remove('hiding');
};

function hiddenMenuDetails() {
	document.getElementsByClassName('show-menu')[0].classList.add('hiding');
	document.getElementsByClassName('show-menu')[0].classList.remove('showing');
};

function changeTheme(theme) {
	var selectedTheme = theme,
			outherThemes = document.querySelectorAll('.theme-box'),
			definedTheme = theme.getAttribute('theme-name'),
			bodyTag = document.getElementsByTagName('body'),
			atualTheme = bodyTag[0].getAttribute('theme-atual');

		for (var i = 0; i < outherThemes.length; i++) {
			outherThemes[i].classList.remove('active');
		}

		selectedTheme.classList.add('active');
		bodyTag[0].setAttribute('theme-atual', definedTheme);
		bodyTag[0].classList.remove(atualTheme);
		bodyTag[0].classList.add(definedTheme);
}

function toggleMenu() {
	var bodyTag = document.getElementsByTagName('body'),
			hasClass = bodyTag[0].className.split(' ');

	document.getElementById('glass').style.display = 'block';

	for (var i = 0; i < hasClass.length; i++) {
		if (hasClass[i] === 'show-menu') {
			bodyTag[0].classList.remove('show-menu');
			bodyTag[0].classList.add('hide-menu');
		} else {
			bodyTag[0].classList.remove('hide-menu');
			bodyTag[0].classList.add('show-menu');
		}
	}

}
