// Namespaces
var pubsub = {};
var Switchboard = {};

// Publish/Subscribe
( function ( obj ) {

  // Storage for topics that can be broadcast or listened to
  var topics = {};

  // A topic identifier
  var subUid = -1;

  // Publish or broadcast events of interest
  // with a specific topic name and arguments
  // such as the data to pass along
  obj.publish = function ( topic, args ) {

    if ( !topics[ topic ] ) {
      return false;
    }

    var subscribers = topics[ topic ],
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
  obj.subscribe = function ( topic, func ) {

    if ( !topics[ topic ] ) {
      topics[ topic ] = [];
    }

    if ( typeOf func !== function ) {
      return false;
    }

    var token = ( ++subUid ).toString();
    topics[ topic ].push( {
      token: token,
      func: func
    } );
    return token;
  };

  // Unsubscribe from a specific
  // topic, based on a tokenized reference
  // to the subscription
  obj.unsubscribe = function ( token ) {
    for ( var m in topics ) {
      if ( topics[ m ] ) {
        for ( var i = 0, j = topics[ m ].length; i < j; i++ ) {
          if ( topics[ m ][ i ].token === token ) {
            topics[ m ].splice( i, 1 );
            return token;
          }
        }
      }
    }
    return this;
  };
}( pubsub ) );

( function ( obj ) {

}( Switchboard ) );


// Extender Function
function extend( obj, extension ) {
  for ( var key in extension ) {
    obj[ key ] = extension[ key ];
  }
};

// Constructor Function
function CheckElement( el ) {
  /* Hidden input element */
  this.switch = document.getElementById( el ) || null;
  /* Exposed label element that toggles the input	*/
  this.facade = document.querySelector( '#' + el + '+ label' ) || null;
}

/*	**************  PUBLISHERS  ********************
 *	Events trigger a broadcast to topic subscribers
 *	which contains data to be passed as an argument
 *	to the subscriber function	****************	*/
var DrawerHandleSwitch = document.getElementById( 'drawer-handle' );
var DrawerHandle = document.querySelector( '#drawer-switch + label' );
extend( DrawerHandleSwitch, new SwitchElement() );

DrawerHandle.handle.onclick = function () {
  pubsub.publish( 'Drawer.switchboard', {
    element: 'DrawerHandle',
    .

  } );
};

/*	**************  SUBSCRIBERS  ***********************
 *	Functions which are triggered by specific message
 *	contexts ( topics ) that are broadcast by the
 *	publishers with each update payload	************	*/
var drawerSubscriber = function ( topic, state ) {
  if ( !status ) {

  }
}
