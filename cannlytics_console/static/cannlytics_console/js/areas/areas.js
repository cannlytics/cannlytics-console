const dragStartData = new Map();
const dragContainer = document.querySelector('.drag-container');
const itemContainers = [].slice.call(document.querySelectorAll('.board-column-content'));
const columnGrids = [];
let boardGrid;

// Init the column grids so we can drag those items around.
itemContainers.forEach(function (container) {
  const grid = new Muuri(container, {
    items: '.board-item',
    dragEnabled: true,
    dragSort: function () {
      return columnGrids;
    },
    dragContainer: dragContainer,
    dragCssProps: {
      touchAction: 'auto',
      userSelect: 'none',
      userDrag: 'none',
      tapHighlightColor: 'rgba(0, 0, 0, 0)',
      touchCallout: 'none',
      contentZooming: 'none'
    },
    dragStartPredicate: function (item, e) {
      // On touch, let's allow dragging if the delay between
      // touchstart and touchmove event is 250ms or more.
      // Note that we need to explicitly prevent scrolling
      // after we start the drag delayed.
      if (e.pointerType === 'touch') {
        // On first event (touchstart) we need to store the
        // drag start data and bind listeners for touchmove
        // and contextmenu.
        if (e.isFirst) {
          const contextMenuListener = e => e.preventDefault();
          const touchMoveListener = (e) => {
            const data = dragStartData.get(item);
            if (data) {
              if (data.dragAllowed) {
                e.cancelable && e.preventDefault();
              } else if (data.dragAllowed === undefined) {
                if (e.cancelable && e.timeStamp - data.startTimeStamp > 250) {
                  data.dragAllowed = true;
                  e.preventDefault();
                } else {
                  data.dragAllowed = false;
                }
              } 
            }
          };
        
          // Store drag start data.
          dragStartData.set(item, {
            dragAllowed: undefined,
            startTimeStamp: e.srcEvent.timeStamp,
            touchMoveListener,
            contextMenuListener
          });
 
          // We need to bind the touch move listener to every scrollable ancestor
          // of the dragged item. You probably want to create a method for
          // querying such elements, but in this example we know the specific
          // elements so we explicitly define the listeners for those.
          // Also note that it's important to bind the listeners with
          // capture:true and passive:false options.
          container.parentNode.addEventListener('touchmove', touchMoveListener, { passive: false, capture: true });
          window.addEventListener('touchmove', touchMoveListener, { passive: false, capture: true });
          
          // Prevent context menu popping up.
          item.getElement().addEventListener('contextmenu', contextMenuListener);

          // Let's keep the drag start predicate in "pending" state.
          return undefined;
        }
        
        // On final event (touchend/touchcancel) we just need to
        // remove the listeners and delete the item's drag data.
        if (e.isFinal) {
          const data = dragStartData.get(item);
          if (data) {
            container.parentNode.removeEventListener('touchmove', data.touchMoveListener, { passive: false, capture: true });
            window.removeEventListener('touchmove', data.touchMoveListener, { passive: false, capture: true });
            item.getElement().removeEventListener('contextmenu', data.contextMenuListener);
            dragStartData.delete(item);
          }
          return undefined;
        }
        
        // On move (touchmove) event let's check the drag state from
        // our drag data and return it for the predicate.
        const data = dragStartData.get(item);
        return data ? data.dragAllowed : undefined;
      }
 
      // On mouse let's allow starting drag immediately
      // if mouse's left button is pressed down.
      if (e.isFirst && e.srcEvent.button) {
        return false;
      } else {
        return true; 
      }
    },
    dragAutoScroll: {
      targets: (item) => {
        return [
          { element: window, priority: 0 },
          { element: item.getGrid().getElement().parentNode, priority: 1 },
        ];
      }
    },
  })
  .on('dragInit', function (item) {
    item.getElement().style.width = item.getWidth() + 'px';
    item.getElement().style.height = item.getHeight() + 'px';
  })
  .on('dragReleaseEnd', function (item) {
    item.getElement().style.width = '';
    item.getElement().style.height = '';
    item.getGrid().refreshItems([item]);
  })
  .on('layoutStart', function () {
    if (boardGrid) {
      boardGrid.refreshItems().layout(); 
    }
  });

  columnGrids.push(grid);
});

// Init board grid so we can drag those columns around.
boardGrid = new Muuri('.board', {
  dragEnabled: true,
  dragHandle: '.board-column-header'
});
