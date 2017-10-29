// Namespace - declared so as to be passed as argument to the IIFE below
var pubsub = {};

// Immediately Invoked Function Expression ( IIFE )
(function(NsObject) {

	// Storage for topics that can be broadcast or listened to
	var topics = {};

	// A topic identifier
	var subUid = -1;

	// Publish or broadcast events of interest
	// with a specific topic name and arguments
	// such as the data to pass along
	NsObject.publish = function(topic, args) {

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
	NsObject.subscribe = function(topic, func) {

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
	NsObject.unsubscribe = function(token) {
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

// Extender Function
function extend(obj, extension) {
	for (var key in extension) {
		obj[key] = extension[key];
	}
};

// Control Element Constructor Function
function SwitchElement() {
	this.checked = false; // tired, fix later
}

/*	**************  PUBLISHERS  ********************
 *	Events trigger a broadcast to topic subscribers
 *	which contains data to be passed as an argument
 *	to the subscriber function	****************	*/
var DrawerHandle = document.getElementById('drawer-handle');

extend(DrawerHandle, new SwitchElement());
DrawerHandle.handle = document.querySelector('#drawer-switch + label');
DrawerHandle.handle.onclick = function() {
	pubsub.publish('drawer.state', drawerSwitchInput.checked)
};

/*	**************  SUBSCRIBERS  ***********************
 *	Functions which are triggered by specific message
 *	contexts ( topics ) that are broadcast by the
 *	publishers with each update payload	************	*/
var drawerSubscriber = function(topic, state) {
	if (!status) {

	}
}
