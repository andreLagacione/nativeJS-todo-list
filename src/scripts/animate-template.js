function animateButtom(button) {
  button.classList.add('animate-click');
  setTimeout(function() {
    button.classList.remove('animate-click');
  }, 1000);
}
