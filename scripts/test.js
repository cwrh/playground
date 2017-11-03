var EventManager = {};

( function ( o ) {

  // Storage for topics that can be broadcast or listened to
  var broadcasts = {};

  // A unique tokenized identifier for individual subscribers
  var subToken = -1;

  // Publish or broadcast events of interest
  // with a specific topic name and arguments
  // such as the data to pass along
  o.publish = o.pub = function ( topic, args ) {

    if ( !broadcasts[ topic ] ) {
      return false;
    }

    var subscribers = broadcasts[ topic ],
      len = subscribers ? subscribers.length : 0;

    while ( len-- ) {
      subscribers[ len ].func( topic, args );
    }

    return this;
  };

  // Subscribe to events of interest
  // with a specific topic name and a
  // callback function, to be executed
  // when the topic/event is observed
  o.subscribe = o.sub = function ( topic, func ) {

    if ( !broadcasts[ topic ] ) {
      broadcasts[ topic ] = [];
    };

    if ( typeOf func !== function ) {
      return false;
    };

    var token = ( ++subUid ).toString();
    broadcasts[ topic ].push( {
      token: token,
      func: func
    } );
    return token;
  };

  // Unsubscribe from a specific
  // topic, based on a tokenized reference
  // to the subscription
  o.unsubscribe = o.unsub = function ( token ) {
    for ( var m in broadcasts ) {
      if ( broadcasts[ m ] ) {
        for ( var i = 0, j = broadcasts[ m ].length; i < j; i++ ) {
          if ( broadcasts[ m ][ i ].token === token ) {
            broadcasts[ m ].splice( i, 1 );
            return token;
          }
        }
      }
    }
    return this;
  };
}( EventManager ) );

var uiDrawer = document.getElementById( 'drawer' );
var drawerNavItems = drawerElement.querySelectorAll( 'input[type="radio"]' );
var drawerHandle = document.getElementById( 'drawer-handle' );

function drawerSubscriberFunction() {

}
