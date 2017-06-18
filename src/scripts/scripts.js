// TODO - criar função para verificar o tempo de cada task e pintar os bullets ao carregar a página
// TODO - criar função para verificar o tempo total da tarefa e pintar o bullet, assim como foi feito para as sub-tarefas

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

	removeActiveClass(categories, 'active');
	removeActiveClass(allIconIndicator, 'fa-chevron-down', 'fa-chevron-right');

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

	removeActiveClass(outherThemes, 'active');
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
			contentTaskClicked = rowTaskClicked.querySelector('.content-task'),
			allSubTasks = contentTaskClicked.querySelectorAll('.row-sub-task'),
			allRowTasks = document.querySelectorAll('.row-task'),
			allContentTasks = document.querySelectorAll('.content-task'),
			allButtomIcon = document.querySelectorAll('.toggle-details i'),
			hasActive = checkHasClass(rowTaskClicked);

	removeActiveClass(allButtomIcon, 'fa-minus', 'fa-plus');
	removeActiveClass(allRowTasks, 'active');

	for (var i = 0; i < allContentTasks.length; i++) {
		allContentTasks[i].style.height = 0;
	}

	for (var i = 0; i < hasActive.length; i++) {
		if (hasActive[i] == 'active') {
			rowTaskClicked.classList.remove('active');
			contentTaskClicked.style.height = 0;
			iconButtom.classList.remove('fa-minus');
			iconButtom.classList.add('fa-plus');
		} else {
			rowTaskClicked.classList.add('active');
			contentTaskClicked.style.height = allSubTasks.length * 40 + 'px';
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
				top: rect.top - rect.height
			};

	if ((rect.width / 2) < (tooltipWidth / 2)) {
		positionTooltip.left = rect.left - ((tooltipWidth / 2) - (rect.width / 2));
	} else if ((rect.width / 2) > (tooltipWidth / 2)) {
		positionTooltip.left = rect.left + ((rect.width / 2) - (tooltipWidth / 2));
	} else {
		positionTooltip.left = rect.left;
	}

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

function toggleTimeTask(buttomControl) {
	clearInterval(intervals.task);
	clearInterval(intervals.category);

	var rowSubTask = buttomControl.parentElement.parentElement,
			categoryTask = rowSubTask.parentElement.previousElementSibling,
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
			controlTimeInTask = categoryTask.querySelector('.time.total'),
			totalTimeInTask = controlTimeInTask.innerHTML.split(':'),
			totalCurrentTime = {
				hours: parseInt(totalTimeInTask[0]),
				minutes: parseInt(totalTimeInTask[1]),
				seconds: parseInt(totalTimeInTask[2])
			},
			allSubTasks = document.querySelectorAll('.row-sub-task'),
			allButtonsToggleTask = document.querySelectorAll('.play-pause-task .fa');

	removeActiveClass(allSubTasks, 'active');
	removeActiveClass(allButtonsToggleTask, 'fa-pause', 'fa-play');

	for (var i = 0; i < hasActive.length; i++) {
		var hasInterval = false;

		if (hasActive[i] == 'active') {
			rowSubTask.classList.remove('active');
			buttomControl.childNodes[0].classList.add('fa-play');
			buttomControl.childNodes[0].classList.remove('fa-pause');
			clearInterval(intervals.task);
			clearInterval(intervals.category);
			break;
		} else {
			rowSubTask.classList.add('active');
			buttomControl.childNodes[0].classList.remove('fa-play');
			buttomControl.childNodes[0].classList.add('fa-pause');
			hasInterval = true;
		}
	}

	if (hasInterval) {
		countTimeInTask(currentTime, elementTimeInTask, 'intervalTask', statusSubTask);
		countTimeInTask(totalCurrentTime, controlTimeInTask, 'intervalCategory', statusSubTask);
	}
}

function countTimeInTask(currentTime, elementTimeInTask, requestInterval, bulletTask) {
	var printTime = {},
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
		chechTimeInTask(currentTime, bulletTask);
	}, 1000);

	if (requestInterval == 'intervalTask') {
		intervals.task = controlInterval;
	} else if (requestInterval == 'intervalCategory') {
		intervals.category = controlInterval
	} else {
		clearInterval(controlInterval);
	}
}

function chechTimeInTask(currentTime, bulletTask) {
	var rowTask = bulletTask.parentNode.parentNode;
			estimatedTimeBox = rowTask.querySelectorAll('.time.estimated'),
			getEstimatedTime = estimatedTimeBox[0].innerHTML.split(':'),
			estimatedHoursToSeconds = (parseInt(getEstimatedTime[0]) * 60 * 60).toFixed(0),
			estimatedminutesToSeconds = (parseInt(getEstimatedTime[1]) * 60).toFixed(0),
			estimatedSeconds = parseInt(getEstimatedTime[2]),
			currentHourToSeconds = (currentTime.hours * 60 * 60).toFixed(0),
			currentMinuteToSeconds = (currentTime.minutes * 60).toFixed(0),
			currentSecond = currentTime.seconds,
			sumSecondsInEstimatedTime = parseFloat(estimatedHoursToSeconds) + parseFloat(estimatedminutesToSeconds) + parseFloat(estimatedSeconds),
			sumSecondsInCurrentTime = parseFloat(currentHourToSeconds) + parseFloat(currentMinuteToSeconds) + parseFloat(currentSecond),
			warningTime = sumSecondsInEstimatedTime * 0.8;

	if (sumSecondsInCurrentTime > warningTime) {
		bulletTask.classList.remove('normal');
		bulletTask.classList.add('warning');
	}

	if (sumSecondsInCurrentTime > sumSecondsInEstimatedTime) {
		bulletTask.classList.remove('normal');
		bulletTask.classList.remove('warning');
		bulletTask.classList.add('danger');
	}
}

function toggleFinish(element) {
	clearInterval(intervals.task);
	clearInterval(intervals.category);

	var checkbox = element.parentElement,
			hasChecked = checkHasClass(element),
			rowTask = checkbox.parentElement,
			typeTask = checkHasClass(rowTask),
			bulletInTask = rowTask.querySelector('.bullet'),
			buttomControl = rowTask.querySelectorAll('.play-pause-task i'),
			typeTaskControl = null;

	for (var i = 0; i < typeTask.length; i++) {
		if (typeTask[i] == 'row-sub-task') {
			typeTaskControl = 'subTask';
		} else if (typeTask[i] == 'top-task') {
			typeTaskControl = 'category';
		}
	}

	for (var i = 0; i < hasChecked.length; i++) {
		if (hasChecked[i] == 'checked') {
			element.classList.remove('checked');
			bulletInTask.classList.remove('finish');
			checkTypeTask('remove');
		} else {
			element.classList.add('checked');
			bulletInTask.classList.add('finish');
			checkTypeTask('add');
		}
	}

	function checkTypeTask(typeReq) {
		var elementsForToggleClass = null,
				checkAllSubTasks = null;

		if (typeTaskControl == 'subTask') {
			elementsForToggleClass = buttomControl;
		} else if (typeTaskControl == 'category') {
			var contentTask = rowTask.nextElementSibling;
			elementsForToggleClass = contentTask.querySelectorAll('.play-pause-task i'),
			checkAllSubTasks = contentTask.querySelectorAll('.check-task .check'),
			allBulletsTask = contentTask.querySelectorAll('.bullet');
		}

		if (typeReq == 'remove') {
			removeActiveClass(elementsForToggleClass, 'fa-stop', 'fa-play');
			if (checkAllSubTasks) {
				removeActiveClass(checkAllSubTasks, 'checked', 'class');
				removeActiveClass(allBulletsTask, 'finish', 'class');
			}
		} else {
			removeActiveClass(elementsForToggleClass, 'fa-play', 'fa-stop');
			if (checkAllSubTasks) {
				removeActiveClass(checkAllSubTasks, 'class', 'checked');
				removeActiveClass(allBulletsTask, 'class', 'finish');
			}
		}
	}
}

function animateLabel(element) {
	var label = element.previousElementSibling;
	checkRemoveAlertText(element);
	label.classList.remove('inactive');
	label.classList.add('active');
}

function removeAnimateLabel(element) {
	var input = element.value,
			label = element.previousElementSibling;

	if (!input) {
		label.classList.remove('active');
		label.classList.add('inactive');
	}
}

function validateForm(event, form) {
	event.preventDefault();

	var inputsToValid = document.getElementsByClassName('validate-input'),
			formElements = form.elements,
			noFormElement = form.getElementsByClassName('include-this'),
			valuesNames = [],
			isValid = true;

	for (var i = 0; i < inputsToValid.length; i++) {
		var childNodesList = inputsToValid[i].parentNode.childNodes,
				lastNode = childNodesList[childNodesList.length - 1],
				hasAlert = false;

		if (lastNode.nodeName !== '#text') {
			var hasClass = checkHasClass(lastNode);

			for (var j = 0; j < hasClass.length; j++) {
				if (hasClass[j] == 'alert-text') {
					hasAlert = true;
					break;
				}
			}
		}

		if (inputsToValid[i].value == '') {
			if (!hasAlert) {
				var messageAlert = inputsToValid[i].getAttribute('text-from-alert'),
						spanAlert = document.createElement('span'),
						alertText = document.createTextNode(messageAlert);

				spanAlert.appendChild(alertText);
				spanAlert.className = 'alert-text';
				inputsToValid[i].parentNode.insertBefore(spanAlert, childNodesList[childNodesList.length]);

				isValid = false;
			}
		}
	}

	if (isValid) {
		for (var i = 0; i < formElements.length; i++) {
			var element = formElements[i],
			 		elementTag = element.tagName.toLowerCase();

			if (elementTag == 'input' || elementTag == 'select' || elementTag == 'textarea') {
				if (elementTag.value) {
					valuesNames.push({
						name: element.name,
						value: element.value
					});
				}
			}
		}

		if (noFormElement) {
			for (var i = 0; i < noFormElement.length; i++) {
				var element = noFormElement[i];

				valuesNames.push({
					name: element.getAttribute('component-name'),
					value: element.innerHTML
				});
			}
		}

		return valuesNames;
	}
}

function showCreateCategories(event) {
	event.preventDefault();
	var rowCreateCategory = document.getElementsByClassName('row-create-category'),
			hasActive = checkHasClass(rowCreateCategory[0]),
			inputCategoryName = document.getElementById('category-name-new-category');

	checkRemoveAlertText(inputCategoryName);

	for (var i = 0; i < hasActive.length; i++) {
		if (hasActive[i] == 'hide') {
			removeActiveClass(rowCreateCategory, 'hide', 'show');
			inputCategoryName.setAttribute('text-from-alert', 'Report category name');
			inputCategoryName.classList.add('validate-input');
		} else if (hasActive[i] == 'show') {
			removeActiveClass(rowCreateCategory, 'show', 'hide');
			inputCategoryName.removeAttribute('text-from-alert', 'Report category name');
			inputCategoryName.classList.remove('validate-input');
		}
	}
}

function showListIcons(element) {
	var listIcons = document.getElementsByClassName('icon-list'),
			hasClass = checkHasClass(listIcons[0]);

	for (var i = 0; i < hasClass.length; i++) {
		if (hasClass[i] == 'active') {
			removeActiveClass(listIcons, 'active', 'inactive');
		} else {
			removeActiveClass(listIcons, 'inactive', 'active');
		}
	}
}

function hideListIcons() {
	var listIcons = document.getElementsByClassName('icon-list');
	removeActiveClass(listIcons, 'active', 'inactive');
}

function getSelectedIcon(row) {
	var iconSelected = row.querySelectorAll('.icon-text'),
			nameIconSelected = iconSelected[0].innerHTML,
			headerIconText = document.querySelectorAll('.field-name.icon-text'),
			headerIconBox = document.getElementsByClassName('selected-icon-box'),
			headerIcon = headerIconBox[0].getElementsByClassName('fa'),
			classListIcon = checkHasClass(headerIcon[0]);

	headerIconText[0].innerHTML = nameIconSelected;
	headerIcon[0].classList.remove(classListIcon[1]);
	headerIcon[0].classList.add(nameIconSelected);
}

function calculateSubTaskTime(timeInBox) {
	var tasks = document.getElementsByClassName('row-task');

	for (var i = 0; i < tasks.length; i++) {
		var subTasks = tasks[i].getElementsByClassName('row-sub-task'),
				elementTimeBox = tasks[i].querySelectorAll('.top-task .time.' + timeInBox);

		if (subTasks.length > 0 || subTasks !== '') {
			var sumTimeInTask = {
				hours: 0,
				minutes: 0,
				seconds: 0
			};

			for (var j = 0; j < subTasks.length; j++) {
				var boxTime = subTasks[j].getElementsByClassName(timeInBox),
						getValueInTask = boxTime[0].innerHTML.split(':');

				sumTimeInTask.hours = sumTimeInTask.hours + parseInt(getValueInTask[0]);
				sumTimeInTask.minutes = sumTimeInTask.minutes + parseInt(getValueInTask[1]);
				sumTimeInTask.seconds = sumTimeInTask.seconds + parseInt(getValueInTask[2]);
			}

			if (sumTimeInTask.hours < 10) sumTimeInTask.hours = '0' + sumTimeInTask.hours;
			if (sumTimeInTask.minutes < 10) sumTimeInTask.minutes = '0' + sumTimeInTask.minutes;
			if (sumTimeInTask.seconds < 10) sumTimeInTask.seconds = '0' + sumTimeInTask.seconds;

			elementTimeBox[0].innerHTML = sumTimeInTask.hours + ':' + sumTimeInTask.minutes + ':' + sumTimeInTask.seconds;
		}
	}
}
