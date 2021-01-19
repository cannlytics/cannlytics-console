/**
 * Cannlytics Console (v1.0.0): theme.js
 * Licensed under GPLv3 (https://github.com/cannlytics/cannlytics_console/blob/main/LICENSE)
 * Author: Keegan Skeate
 * Created: 12/6/2020
 */

export function changeTheme() {
  var theme = localStorage.getItem('theme');
  if (!theme) {
    var hours = new Date().getHours();
    var dayTime = hours > 6 && hours < 20;
    theme = dayTime ? 'light' : 'dark';
  }
  var newTheme = (theme === 'light') ? 'dark' : 'light';
  setTheme(newTheme);
  localStorage.setItem('theme', newTheme);
}

export function setInitialTheme () {
  if (typeof(Storage) !== 'undefined') {
    var theme = localStorage.getItem('theme');
    if (!theme) {
      var hours = new Date().getHours();
      var dayTime = hours > 6 && hours < 20;
      if (!dayTime) setTheme('dark');
      return;
    }
    setTheme(theme);
    localStorage.setItem('theme', theme);
  }
};

function setTheme(theme) {
  if (theme === 'light') {
    document.body.className = 'base';
  } else if (! hasClass(document.body, 'dark')) {
    document.body.className += ' dark';
  }
}

function hasClass(element, className) {
  return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
}
