var EventManager = ( function () {

  // Storage for topics that can be broadcast or listened to
  var topics = {};

  // A unique tokenized identifier for individual subscribers
  var subToken = -1;

  // Publish or broadcast events of interest
  // with a specific topic name and arguments
  // such as the data to pass along
  function publish( topic, args ) {

    if ( !topics[ topic ] ) {
      return false;
    }

    var subscribers = topics[ topic ],
      len = subscribers ? subscribers.length : 0;

    while ( len-- ) {
      subscribers[ len ].func( topic, args );
    }

    return this;
  }

  function publishMultiple( subscriber, topic, data ) {
    var subscribers = topics[ topic ],
      b;

    if ( !topics.hasOwnProperty( receiver ) ) {
      return;
    }

    for ( b in topics ) {
      if ( subscribers.hasOwnProperty( b ) ) {
        publishMultiple( subscribers[ b ], topic, data );
      }
    }
  }

  function subTopics( subscriber, topic, data ) {
    var subtopic = String( topic ),
      position = topic.lastIndexOf( '.' );

    // deliver the message as it is now
    publishMultiple( subscriber, topic, data );

    // trim the hierarchy and deliver message to each level
    while ( position !== -1 ) {
      subtopic = subtopic.substr( 0, position );
      position = subtopic.lastIndexOf( '.' );
      publishMultiple( subscriber, subtopic, data );
    }
  }

  // Subscribe to events of interest
  // with a specific topic name and a
  // callback function, to be executed
  // when the topic/event is observed
  function subscribe( topic, func ) {

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
  }

  // Unsubscribe from a specific
  // topic, based on a tokenized reference
  // to the subscription
  function unsubscribe( token ) {
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
  }
}() );

var uiDrawer = document.getElementById( 'drawer' );
var drawerNavItems = drawerElement.querySelectorAll( 'input[type="radio"]' );
var drawerHandle = document.getElementById( 'drawer-handle' );


EventManager.subscribe( 'drawer.nav', drawerSubscriber );
EventManager.subscribe( 'drawer.handle', drawerSubscriber );

var drawerSubscriber = function ( topic, data ) {

}
