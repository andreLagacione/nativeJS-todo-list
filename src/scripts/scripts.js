window.onload = function() {
	actionsSidebarMenu();
};

var actionsSidebarMenu = function() {
	var categoryItem = document.querySelectorAll('#main-menu > ul > li');

	for (var i = 0; i < categoryItem.length; i++) {
		categoryItem[i].addEventListener('click', function(e) {
			categoryItem[i].classList.remove('active');
		});
	}
}