// GLOBAL VARIABLES
var intervals = {
			category: null,
			task: null
		},
		controlShowCategories = 0;

window.onload = function loadWindow() {
	var now = new Date();
	getDateDate(now);
	getHour();
	calculateSubTaskTime();

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

function removeActiveClass(element, classForRemove, classForAdd, classControl) {
	for (var i = 0; i < element.length; i++) {
		if (classForRemove && classForAdd) {
			element[i].classList.remove(classForRemove);
			element[i].classList.add(classForAdd);
		} else {
			element[i].classList.remove(classControl);
		}
	}
}

function checkRemoveAlertText(baseNode) {
	var parentNodeChildrens = baseNode.parentNode.childNodes,
			hasAlert = parentNodeChildrens[parentNodeChildrens.length - 1];

	if (hasAlert && hasAlert.nodeName !== '#text') {
		var hasClass = checkHasClass(hasAlert);

		for (var i = 0; i < hasClass.length; i++) {
			if (hasClass[i] == 'alert-text') {
				hasAlert.remove();
				break;
			}
		}
	}
}
