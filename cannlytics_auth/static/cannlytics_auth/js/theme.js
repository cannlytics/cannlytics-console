/**
 * theme.js | Cannlytics Console
 * Licensed under GPLv3 (https://github.com/cannlytics/cannlytics_console/blob/main/LICENSE)
 * Author: Keegan Skeate <contact@cannlytics.com>
 * Created: 2/13/2021
 */


function changeTheme() {
  /* Change the website's theme. */
  var theme = localStorage.getItem('theme');
  if (!theme) {
    var hours = new Date().getHours();
    var dayTime = hours > 6 && hours < 20;
    theme = dayTime ? 'light' : 'dark';
  }
  var newTheme = (theme === 'light') ? 'dark' : 'light';
  this.setTheme(newTheme);
  localStorage.setItem('theme', newTheme);
}


function setInitialTheme() {
  /* Set the theme when the website loads. */
  if (typeof(Storage) !== 'undefined') {
    var theme = localStorage.getItem('theme');
    if (!theme) {
      var hours = new Date().getHours();
      var dayTime = hours > 6 && hours < 20;
      if (!dayTime) this.setTheme('dark');
      return;
    }
    this.setTheme(theme);
    localStorage.setItem('theme', theme);
  } else {
    document.getElementById('theme-toggle').style.display = 'none';
  }
}


 function setTheme(theme) {
  /* Set the website's theme. */
  if (theme === 'light') {
    document.body.className = 'base';
  } else if (! this.hasClass(document.body, 'dark')) {
    document.body.className += ' dark';
  }
}


function hasClass(element, className) {
  /* Check if an element has a class. */
  return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
}
