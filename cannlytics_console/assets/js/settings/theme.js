/**
 * Theme JavaScript | Cannlytics Console
 * Author: Keegan Skeate
 * Created: 12/6/2020
 * Updated: 4/24/2021
 */


export const theme = {


  changeTheme() {
    /*
     * Change the UI theme.
     */
    var theme = localStorage.getItem('theme');
    if (!theme) {
      var hours = new Date().getHours();
      var dayTime = hours > 6 && hours < 20;
      theme = dayTime ? 'light' : 'dark';
    }
    var newTheme = (theme === 'light') ? 'dark' : 'light';
    this.toggleTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  },


  setInitialTheme () {
    /*
     * Set th initial UI theme.
     */
    if (typeof(Storage) !== 'undefined') {
      var theme = localStorage.getItem('theme');
      if (!theme) {
        var hours = new Date().getHours();
        var dayTime = hours > 6 && hours < 20;
        if (!dayTime) this.toggleTheme('dark');
        return;
      }
      this.toggleTheme(theme);
      localStorage.setItem('theme', theme);
    }
  },

  getTheme() {
    /*
     * Get the current theme.
     */
    return (document.body.classList.contains('dark')) ? 'dark' : 'light';
  },


  toggleTheme(theme) {
    /*
     * Toggle the UI theme.
     */
    let currentTableClass = 'ag-theme-alpine';
    let newTableClass = 'ag-theme-alpine-dark';
    if (theme === 'light') {
      document.body.className = 'base';
      currentTableClass = 'ag-theme-alpine-dark';
      newTableClass = 'ag-theme-alpine';
    } else {
      // if (!hasClass(document.body, 'dark')) 
      // document.body.className += ' dark';
      document.body.classList.add('dark');
    }
    // Toggle Ag-Grid theme.
    let tables = document.getElementsByClassName(currentTableClass);
    [...tables].forEach( x => x.classList.add(newTableClass) );
    [...tables].forEach( x => x.classList.remove(currentTableClass) );
  }


}

// function hasClass(element, className) {
//   return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
// }

