var EventManager = ( function () {

  // Top-level object used to store all subscriber/subscription data
  var topics = {};

  // A unique tokenized identifier for individual subscribers
  var uid = -1;

  // Publish or broadcast events of interest
  // with a specific topic name and arguments
  // such as the data to pass along
  function publish( topic, data ) {
    var topicList = topic.split( '.' );

    var mainTopic = topicList.shift();
  }

  function distribute( topic, data ) {
    var subscribers = topics[ topic ],
      len = subscribers ? subscribers.length : 0;

    if ( !topics[ topic ] ) {
      return;
    }

    while ( len-- ) {
      subscribers[ len ].func( topic, data );
    }

    return this;
  }

  function listTopics( topic, data ) {
    var subTopic = String( topic ),
      position = topic.lastIndexOf( '.' );

    // deliver the message as it is now
    publishTopic( topic, data );

    // trim the hierarchy and deliver message to each level
    while ( position !== -1 ) {
      subtopic = subtopic.substr( 0, position );
      position = subtopic.lastIndexOf( '.' );
      publishTopic( subtopic, data );
    }
  }

  // Subscribe to events of interest
  // with a specific topic name and a
  // callback function, to be executed
  // when the topic/event is observed
  function subscribe( topic, fn ) {
    var token = 'UID_' + ( ++uid ).toString();

    if ( !topics[ topic ] ) {
      topics[ topic ] = [];
    }

    if ( typeOf fn !== 'function' ) {
      return false;
    }

    topics[ topic ].push( {
      uid: token,
      func: fn,
    } );

    return {
      uid: token,
      func: fn,
      subscription: topic
    };
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

  return {
    publish: publish,
    subscribe: subscribe,
    unsubscribe: unsubscribe
  };
}() );

var uiDrawer = document.getElementById( 'drawer' );
var drawerNavItems = drawerElement.querySelectorAll( 'input[type="radio"]' );
var drawerHandle = document.getElementById( 'drawer-handle' );


EventManager.subscribe( 'drawer.nav', drawerSubscriber );
EventManager.subscribe( 'drawer.handle', drawerSubscriber );

var drawerSubscriber = function ( topic, data ) {

};
