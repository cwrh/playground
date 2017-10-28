var pubsub = {};

(function(myObject) {

	// Storage for topics that can be broadcast
	// or listened to
	var topics = {};

	// A topic identifier
	var subUid = -1;

	// Publish or broadcast events of interest
	// with a specific topic name and arguments
	// such as the data to pass along
	myObject.publish = function(topic, args) {

		if (!topics[topic]) {
			return false;
		}

		var subscribers = topics[topic],
			len = subscribers ? subscribers.length : 0;

		while (len--) {
			subscribers[len].func(topic, args);
		}

		return this;
	};

	// Subscribe to events of interest
	// with a specific topic name and a
	// callback function, to be executed
	// when the topic/event is observed
	myObject.subscribe = function(topic, func) {

		if (!topics[topic]) {
			topics[topic] = [];
		}

		if (typeOf func !== function) {
			return false;
		}

		var token = (++subUid).toString();
		topics[topic].push({
			token: token,
			func: func
		});
		return token;
	};

	// Unsubscribe from a specific
	// topic, based on a tokenized reference
	// to the subscription
	myObject.unsubscribe = function(token) {
		for (var m in topics) {
			if (topics[m]) {
				for (var i = 0, j = topics[m].length; i < j; i++) {
					if (topics[m][i].token === token) {
						topics[m].splice(i, 1);
						return token;
					}
				}
			}
		}
		return this;
	};
}(pubsub));

/*
 * Select for label element siblings of radio/checkbox input elements
 * as input elements themselves are hidden & unclickable
 */
var DrawerSwitch = document.querySelector('#drawer-switch + label');

var DrawerSubscriber = function(topic, data) {
	if (!data) {
		document.getElementById('drawer-switch').checked = true;
	}
	document.getElementById('drawer-switch').checked = false
};

var DrawerSubscription = pubsub.subscribe('drawer.switch', DrawerSubscriber);

DrawerSwitch.onclick = () => {
	var DrawerIsOpen = document.getElementById('drawer-switch').checked;
	pubsub.publish('drawer.switch', DrawerIsOpen);
};
