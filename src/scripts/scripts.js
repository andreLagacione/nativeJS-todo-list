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

function checkHasClass(element) {
	return element.className.split(' ');
}

function actionsSidebarMenu(item) {
	var categories = document.querySelectorAll('#main-menu > ul > li'),
		hasClass = checkHasClass(item),
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
			hasClass = checkHasClass(bodyTag[0]);

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

function toggleDetailsTask(toggleButtom) {
	var rowTaskClicked = toggleButtom.parentElement.parentElement.parentElement,
			iconButtom = toggleButtom.childNodes[0],
			contentTaskClicked = rowTaskClicked.querySelectorAll('.content-task'),
			allRowTasks = document.querySelectorAll('.row-task'),
			allContentTasks = document.querySelectorAll('.content-task'),
			allButtomIcon = document.querySelectorAll('.toggle-details i'),
			hasActive = checkHasClass(rowTaskClicked);

	for (var i = 0; i < allButtomIcon.length; i++) {
		allButtomIcon[i].classList.remove('fa-minus');
		allButtomIcon[i].classList.add('fa-plus');
	}

	for (var i = 0; i < allRowTasks.length; i++) {
		allRowTasks[i].classList.remove('active');
	}

	for (var i = 0; i < allContentTasks.length; i++) {
		allContentTasks[i].style.height = 0;
	}

	for (var i = 0; i < hasActive.length; i++) {
		if (hasActive[i] == 'active') {
			rowTaskClicked.classList.remove('active');
			contentTaskClicked[0].style.height = 0;
			iconButtom.classList.remove('fa-minus');
			iconButtom.classList.add('fa-plus');
		} else {
			rowTaskClicked.classList.add('active');
			contentTaskClicked[0].style.height = '160px';
			iconButtom.classList.add('fa-minus');
			iconButtom.classList.remove('fa-plus');
		}
	}
}

function configureTooltip(anchorElement) {
	var tooltipText = anchorElement.getAttribute('tooltip-text'),
			tooltipComponent = document.getElementById('tooltip-component'),
			tooltipWidth = tooltipComponent.offsetWidth,
			rect = anchorElement.getBoundingClientRect(),
			positionTooltip = {
				left: rect.left,
				top: rect.top - rect.height
			};

	tooltipComponent.innerHTML = tooltipText;
	tooltipComponent.style.left = positionTooltip.left + 'px';
	tooltipComponent.style.top = positionTooltip.top + 'px';
	tooltipComponent.style.zIndex = 80;
	tooltipComponent.style.opacity = 1;
}

function hiddenTooltip() {
	tooltipComponent = document.getElementById('tooltip-component'),
	tooltipComponent.style.zIndex = -50;
	tooltipComponent.style.opacity = 0;
}

var controlInterval = null;

function toggleTimeTask(buttomControl) {
	clearInterval(controlInterval);
	
	var rowSubTask = buttomControl.parentElement.parentElement,
			statusSubTask = rowSubTask.querySelector('.bullet'),
			elementTimeInTask = rowSubTask.querySelector('.time.total'),
			timeInTask = elementTimeInTask.innerHTML.split(':'),
			timeEstimedForTask = rowSubTask.querySelector('.time.estimated').innerHTML.split(':'),
			hasActive = checkHasClass(rowSubTask),
			currentTime = {
				hours: parseInt(timeInTask[0]),
				minutes: parseInt(timeInTask[1]),
				seconds: parseInt(timeInTask[2])
			},
			// estimedTime = {
			// 	hours: parseInt(timeEstimedForTask[0]),
			// 	minutes: parseInt(timeEstimedForTask[1]),
			// 	seconds: parseInt(timeEstimedForTask[2])
			// };
			allSubTasks = document.querySelectorAll('.row-sub-task'),
			allButtonsToggleTask = document.querySelectorAll('.play-pause-task .fa');

	for (var i = 0; i < allSubTasks.length; i++) {
		allSubTasks[i].classList.remove('active');
	}

	for (var i = 0; i < allButtonsToggleTask.length; i++) {
		allButtonsToggleTask[i].classList.remove('fa-pause');
		allButtonsToggleTask[i].classList.add('fa-play');
	}

	for (var i = 0; i < hasActive.length; i++) {
		var hasInterval = false;

		if (hasActive[i] == 'active') {
			rowSubTask.classList.remove('active');
			buttomControl.childNodes[0].classList.add('fa-play');
			buttomControl.childNodes[0].classList.remove('fa-pause');
			clearInterval(controlInterval);
			break;
		} else {
			rowSubTask.classList.add('active');
			buttomControl.childNodes[0].classList.remove('fa-play');
			buttomControl.childNodes[0].classList.add('fa-pause');
			hasInterval = true;
		}
	}

	if (hasInterval) {
		countTimeInTask(currentTime, elementTimeInTask);
	}
}

function countTimeInTask(currentTime, elementTimeInTask) {
	var printTime = {};

	controlInterval = setInterval(function() {
		currentTime.seconds++;

		if (currentTime.seconds > 59) {
			currentTime.minutes++;
			currentTime.seconds = 0
		}

		if (currentTime.minutes > 59) {
			currentTime.hours++;
			currentTime.minutes = 0;
		}

		currentTime.seconds < 10 ? printTime.seconds = '0' + currentTime.seconds : printTime.seconds = currentTime.seconds;
		currentTime.minutes < 10 ? printTime.minutes = '0' + currentTime.minutes : printTime.minutes = currentTime.minutes
		currentTime.hours < 10 ? printTime.hours = '0' + currentTime.hours : printTime.hours = currentTime.hours;

		elementTimeInTask.innerHTML = printTime.hours + ':' + printTime.minutes + ':' + printTime.seconds;
	}, 1000);
}
