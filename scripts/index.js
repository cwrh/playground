var showElement = toggle => {
  let elemID = toggle.getAttribute( 'data-element' );
  let elem = document.getElementById( elemID );
  let openClass = elemID + '-open';
  if ( toggle.checked === true ) {
    elem.classList.add( openClass );
  } else {
    elem.classList.remove( openClass );
  }
};
var drawerClose = () => {
  document.getElementById( 'tgl__drawer' ).checked = null;
  document.getElementById( 'drawer' ).classList.remove( 'drawer-open' );
}
