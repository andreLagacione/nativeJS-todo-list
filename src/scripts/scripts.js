function actionsSidebarMenu(item, e) {
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
}