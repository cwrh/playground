var EventManager = ( function()
{
		/*
		 *  EventManager ***
		 *  Topic format: 'Event.Region.Element'
		 *  ex. 'click.drawer.handle'   * *  Event is always required, Regrion/Element are optional
		 *  ex. 'dblclick.pusher'       * *  Region is only required if Element is specified
		 *  ex. 'keydown'               * *  Event can be broadcast by itself
		 */
		// Top-level object used to store all subscriber/subscription data
		var topics = {};

		// A unique tokenized identifier for individual subscribers
		var uid = -1;

		function hasSubtopic( topic )
		{
				if ( topic.indexOf( '.' ) !== -1 )
				{
						return true;
				}

				return false;
		}

		// Publish or broadcast events of interest
		// with a specific topic name and arguments
		// such as the data to pass along
		function publish( topic, data )
		{
				if ( !hasSubtopic( topic ) )
				{
						disseminate( topic, data );
				}

				disseminate( topic, data );
				var subtopic = topic.substring( ( topic.indexOf( '.' ) ), ( topic.length ) );
				disseminate( subtopic, data );
		}

		function disseminate( topic, data )
		{

				// Abort if there are no subscribers to the event
				if ( !topics[ topic ] )
				{
						return;
				}

				// Iterate through subscribers
				topics[ topic ].forEach( function( subscriberFn )
				{
						// Abort if data is undefined
						if ( !data )
						{
								return;
						}

						// If data exists, pass it to the subscriber function
						subscriberFn( topic, data );
				} );

				return this;
		}

		// Subscribe to events of interest
		// with a specific topic name and a
		// callback function, to be executed
		// when the topic/event is observed
		function subscribe( topic, fn )
		{
				var token = 'UID_' + ( ++uid ).toString();

				if ( !topics[ topic ] )
				{
						topics[ topic ] = [];
				}

				if ( typeOf fn !== 'function' )
				{
						return;
				}

				topics[ topic ].push(
				{
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
		function unsubscribe( token )
		{
				for ( var m in topics )
				{
						if ( topics[ m ] )
						{
								for ( var i = 0, j = topics[ m ].length; i < j; i++ )
								{
										if ( topics[ m ][ i ].token === token )
										{
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

var Drawer = document.getElementById( 'drawer' );
var drawerNavItems = Drawer.querySelectorAll( 'input[type="radio"]' );
var drawerHandle = document.getElementById( 'drawer-handle' );

EventManager.subscribe( 'click.drawer', drawerSubscriber );

drawerHandle.onclick = publish( 'click.drawer.handle', this )

var drawerSubscriber = function( topic, data )
{
		if ( !data )
		{
				return;
		}

		let clicked = data,
				broadcast = topic;

		if ( clicked.tagName === 'INPUT' && clicked.checked === true )
		{
				if ( clicked.classList.contains( 'sb-radio' ) )
				{
						// Focus: selected page
				}

		}
};
