/**
 * Area JavaScript | Cannlytics Console
 * Licensed under GPLv3 (https://github.com/cannlytics/cannlytics_console/blob/main/LICENSE)
 * Author: Keegan Skeate <contact@cannlytics.com>
 * Created: 12/7/2020
 * Updated: 5/8/2021
 */


//
// Initialize grid variables.
//

var grid = null;
var docElem = document.documentElement;
var demo = document.querySelector('.grid-demo');
var gridElement = demo.querySelector('.grid');
var filterField = demo.querySelector('.filter-field');
var searchField = demo.querySelector('.search-field');
var sortField = demo.querySelector('.sort-field');
var layoutField = demo.querySelector('.layout-field');
var addItemsElement = demo.querySelector('.add-more-items');
var characters = 'abcdefghijklmnopqrstuvwxyz';
var filterOptions = ['red', 'blue', 'green'];
var dragOrder = [];
var uuid = 0;
var filterFieldValue;
var sortFieldValue;
var layoutFieldValue;
var searchFieldValue;

//
// Grid helper functions
//

function initializeAreaGrid() {

  initGrid();

  // Reset field values.
  searchField.value = '';
  [sortField, filterField, layoutField].forEach(function (field) {
    field.value = field.querySelectorAll('option')[0].value;
  });

  // Set initial search query, active filter, active sort value and active layout.
  searchFieldValue = searchField.value.toLowerCase();
  filterFieldValue = filterField.value;
  sortFieldValue = sortField.value;
  layoutFieldValue = layoutField.value;

  // Search field binding.
  searchField.addEventListener('keyup', function () {
    var newSearch = searchField.value.toLowerCase();
    if (searchFieldValue !== newSearch) {
      searchFieldValue = newSearch;
      filter();
    }
  });

  // Filter, sort and layout bindings.
  filterField.addEventListener('change', filter);
  sortField.addEventListener('change', sort);
  layoutField.addEventListener('change', changeLayout);

  // Add/remove items bindings.
  addItemsElement.addEventListener('click', addItems);
  gridElement.addEventListener('click', function (e) {
    if (elementMatches(e.target, '.card-remove, .card-remove i')) {
      removeItem(e);
    }
  });

}

function initGrid() {

  var dragCounter = 0;

  grid = new Muuri(gridElement, {
    items: generateElements(20),
    layoutDuration: 400,
    layoutEasing: 'ease',
    dragEnabled: true,
    dragSortInterval: 50,
    dragContainer: document.body,
    dragStartPredicate: function (item, event) {
      var isDraggable = sortFieldValue === 'order';
      var isRemoveAction = elementMatches(event.target, '.card-remove, .card-remove i');
      return isDraggable && !isRemoveAction ? Muuri.ItemDrag.defaultStartPredicate(item, event) : false;
    },
    dragReleaseDuration: 400,
    dragReleaseEasing: 'ease'
  })
  .on('dragStart', function () {
    ++dragCounter;
    docElem.classList.add('dragging');
  })
  .on('dragEnd', function () {
    if (--dragCounter < 1) {
      docElem.classList.remove('dragging');
    }
  })
  .on('move', updateIndices)
  .on('sort', updateIndices);

}

function filter() {

  filterFieldValue = filterField.value;
  grid.filter(function (item) {
    var element = item.getElement();
    var isSearchMatch = !searchFieldValue ? true : (element.getAttribute('data-title') || '').toLowerCase().indexOf(searchFieldValue) > -1;
    var isFilterMatch = !filterFieldValue ? true : (element.getAttribute('data-color') || '') === filterFieldValue;
    return isSearchMatch && isFilterMatch;
  });

}

function sort() {

  // Do nothing if sort value did not change.
  var currentSort = sortField.value;
  if (sortFieldValue === currentSort) {
    return;
  }

  // If we are changing from "order" sorting to something else
  // let's store the drag order.
  if (sortFieldValue === 'order') {
    dragOrder = grid.getItems();
  }

  // Sort the items.
  grid.sort(
    currentSort === 'title' ? compareItemTitle :
    currentSort === 'color' ? compareItemColor :
    dragOrder
  );

  // Update indices and active sort value.
  updateIndices();
  sortFieldValue = currentSort;

}

function addItems() {

  // Generate new elements.
  var newElems = generateElements(5);

  // Set the display of the new elements to "none" so it will be hidden by
  // default.
  newElems.forEach(function (item) {
    item.style.display = 'none';
  });

  // Add the elements to the grid.
  var newItems = grid.add(newElems);

  // Update UI indices.
  updateIndices();

  // Sort the items only if the drag sorting is not active.
  if (sortFieldValue !== 'order') {
    grid.sort(sortFieldValue === 'title' ? compareItemTitle : compareItemColor);
    dragOrder = dragOrder.concat(newItems);
  }

  // Finally filter the items.
  filter();

}

function removeItem(e) {

  var elem = elementClosest(e.target, '.item');
  grid.hide(elem, {onFinish: function (items) {
    var item = items[0];
    grid.remove(item, {removeElements: true});
    if (sortFieldValue !== 'order') {
      var itemIndex = dragOrder.indexOf(item);
      if (itemIndex > -1) {
        dragOrder.splice(itemIndex, 1);
      }
    }
  }});
  updateIndices();

}

function changeLayout() {

  layoutFieldValue = layoutField.value;
  grid._settings.layout = {
    horizontal: false,
    alignRight: layoutFieldValue.indexOf('right') > -1,
    alignBottom: layoutFieldValue.indexOf('bottom') > -1,
    fillGaps: layoutFieldValue.indexOf('fillgaps') > -1
  };
  grid.layout();

}

//
// Generic helper functions
//

function generateElements(amount) {

  var ret = [];

  for (var i = 0, len = amount || 1; i < amount; i++) {

    var id = ++uuid;
    var color = getRandomItem(filterOptions);
    var title = generateRandomWord(2);
    var width = Math.floor(Math.random() * 2) + 1;
    var height = Math.floor(Math.random() * 2) + 1;
    var itemElem = document.createElement('div');
    var itemTemplate = '' +
        '<div class="item h' + height + ' w' + width + ' ' + color + '" data-id="' + id + '" data-color="' + color + '" data-title="' + title + '">' +
          '<div class="item-content">' +
            '<div class="card">' +
              '<div class="card-id">' + id + '</div>' +
              '<div class="card-title">' + title + '</div>' +
              '<div class="card-remove">Close</div>' +
            '</div>' +
          '</div>' +
        '</div>';

    itemElem.innerHTML = itemTemplate;
    ret.push(itemElem.firstChild);

  }

  return ret;

}

function getRandomItem(collection) {

  return collection[Math.floor(Math.random() * collection.length)];

}

function generateRandomWord(length) {

  var ret = '';
  for (var i = 0; i < length; i++) {
    ret += getRandomItem(characters);
  }
  return ret;

}

function compareItemTitle(a, b) {

  var aVal = a.getElement().getAttribute('data-title') || '';
  var bVal = b.getElement().getAttribute('data-title') || '';
  return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;

}

function compareItemColor(a, b) {

  var aVal = a.getElement().getAttribute('data-color') || '';
  var bVal = b.getElement().getAttribute('data-color') || '';
  return aVal < bVal ? -1 : aVal > bVal ? 1 : compareItemTitle(a, b);

}

function updateIndices() {

  grid.getItems().forEach(function (item, i) {
    item.getElement().setAttribute('data-id', i + 1);
    item.getElement().querySelector('.card-id').innerHTML = i + 1;
  });

}

function elementMatches(element, selector) {

  var p = Element.prototype;
  return (p.matches || p.matchesSelector || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || p.oMatchesSelector).call(element, selector);

}

function elementClosest(element, selector) {

  if (window.Element && !Element.prototype.closest) {
    var isMatch = elementMatches(element, selector);
    while (!isMatch && element && element !== document) {
      element = element.parentNode;
      isMatch = element && element !== document && elementMatches(element, selector);
    }
    return element && element !== document ? element : null;
  }
  else {
    return element.closest(selector);
  }

}

//
// Fire it up!
//
console.log('Initializing areas....');
initializeAreaGrid();


// LIST

// const dragStartData = new Map();
// const dragContainer = document.querySelector('.drag-container');
// const itemContainers = [].slice.call(document.querySelectorAll('.board-column-content'));
// const columnGrids = [];
// let boardGrid;

// // Initialize the column grids to enable dragging.
// itemContainers.forEach(function (container) {
//   const grid = new Muuri(container, {
//     items: '.board-item',
//     dragEnabled: true,
//     dragSort: function () {
//       return columnGrids;
//     },
//     dragContainer: dragContainer,
//     dragCssProps: {
//       touchAction: 'auto',
//       userSelect: 'none',
//       userDrag: 'none',
//       tapHighlightColor: 'rgba(0, 0, 0, 0)',
//       touchCallout: 'none',
//       contentZooming: 'none'
//     },
//     dragStartPredicate: function (item, e) {
//       // On touch, let's allow dragging if the delay between
//       // touchstart and touchmove event is 250ms or more.
//       // Note that we need to explicitly prevent scrolling
//       // after we start the drag delayed.
//       if (e.pointerType === 'touch') {
//         // On first event (touchstart) we need to store the
//         // drag start data and bind listeners for touchmove
//         // and contextmenu.
//         if (e.isFirst) {
//           const contextMenuListener = e => e.preventDefault();
//           const touchMoveListener = (e) => {
//             const data = dragStartData.get(item);
//             if (data) {
//               if (data.dragAllowed) {
//                 e.cancelable && e.preventDefault();
//               } else if (data.dragAllowed === undefined) {
//                 if (e.cancelable && e.timeStamp - data.startTimeStamp > 250) {
//                   data.dragAllowed = true;
//                   e.preventDefault();
//                 } else {
//                   data.dragAllowed = false;
//                 }
//               } 
//             }
//           };
        
//           // Store drag start data.
//           dragStartData.set(item, {
//             dragAllowed: undefined,
//             startTimeStamp: e.srcEvent.timeStamp,
//             touchMoveListener,
//             contextMenuListener
//           });
 
//           // We need to bind the touch move listener to every scrollable ancestor
//           // of the dragged item. You probably want to create a method for
//           // querying such elements, but in this example we know the specific
//           // elements so we explicitly define the listeners for those.
//           // Also note that it's important to bind the listeners with
//           // capture:true and passive:false options.
//           container.parentNode.addEventListener('touchmove', touchMoveListener, { passive: false, capture: true });
//           window.addEventListener('touchmove', touchMoveListener, { passive: false, capture: true });
          
//           // Prevent context menu popping up.
//           item.getElement().addEventListener('contextmenu', contextMenuListener);

//           // Let's keep the drag start predicate in "pending" state.
//           return undefined;
//         }
        
//         // On final event (touchend/touchcancel) we just need to
//         // remove the listeners and delete the item's drag data.
//         if (e.isFinal) {
//           const data = dragStartData.get(item);
//           if (data) {
//             container.parentNode.removeEventListener('touchmove', data.touchMoveListener, { passive: false, capture: true });
//             window.removeEventListener('touchmove', data.touchMoveListener, { passive: false, capture: true });
//             item.getElement().removeEventListener('contextmenu', data.contextMenuListener);
//             dragStartData.delete(item);
//           }
//           return undefined;
//         }
        
//         // On move (touchmove) event let's check the drag state from
//         // our drag data and return it for the predicate.
//         const data = dragStartData.get(item);
//         return data ? data.dragAllowed : undefined;
//       }
 
//       // On mouse let's allow starting drag immediately
//       // if mouse's left button is pressed down.
//       if (e.isFirst && e.srcEvent.button) {
//         return false;
//       } else {
//         return true; 
//       }
//     },
//     dragAutoScroll: {
//       targets: (item) => {
//         return [
//           { element: window, priority: 0 },
//           { element: item.getGrid().getElement().parentNode, priority: 1 },
//         ];
//       }
//     },
//   })
//   .on('dragInit', function (item) {
//     item.getElement().style.width = item.getWidth() + 'px';
//     item.getElement().style.height = item.getHeight() + 'px';
//   })
//   .on('dragReleaseEnd', function (item) {
//     item.getElement().style.width = '';
//     item.getElement().style.height = '';
//     item.getGrid().refreshItems([item]);
//   })
//   .on('layoutStart', function () {
//     if (boardGrid) {
//       boardGrid.refreshItems().layout(); 
//     }
//   });

//   columnGrids.push(grid);
// });

// // Initialize board grid to enable dragging.
// boardGrid = new Muuri('.board', {
//   dragEnabled: true,
//   dragHandle: '.board-column-header'
// });
