var EventManager = {};

(function(o) {

	// Storage for topics that can be broadcast or listened to
	var broadcasts = {};

	// A unique tokenized identifier for individual subscribers
	var subToken = -1;

	// Publish or broadcast events of interest
	// with a specific topic name and arguments
	// such as the data to pass along
	o.broadcast = o.cast = function(message, args) {

		if (!broadcasts[message]) {
			return false;
		};

		var subscribers = broadcasts[message],
			len = subscribers ? subscribers.length : 0;

		while (len--) {
			subscribers[len].func(message, args);
		};

		return this;
	};

	o.sendBroadcast = function(receiver, message, data) {
		var receivers = broadcasts[message],
			b;

		if (!broadcasts.hasOwnProperty(receiver)) {
			return;
		};

		for (b in broadcasts) {
			if (receivers.hasOwnProperty(b)) {
				sendBroadcast(receivers[b], message, data);
			}
		}
	};

	o.subtopics = function(receiver, message, data) {
		var submessage = String(message),
			position = topic.lastIndexOf('.');

		// deliver the message as it is now
		sendBroadcast(receiver, message, data);

		// trim the hierarchy and deliver message to each level
		while (position !== -1) {
			submessage = submessage.substr(0, position);
			position = submessage.lastIndexOf('.');
			sendBroadcast(receiver, submessage, data);
		};
	};

	// Subscribe to events of interest
	// with a specific topic name and a
	// callback function, to be executed
	// when the topic/event is observed
	o.subscribe = o.sub = function(message, func) {

		if (!broadcasts[message]) {
			broadcasts[message] = [];
		};

		if (typeOf func !== function) {
			return false;
		};

		var token = (++subUid).toString();
		broadcasts[message].push({
			token: token,
			func: func
		});
		return token;
	};

	// Unsubscribe from a specific
	// topic, based on a tokenized reference
	// to the subscription
	o.unsubscribe = o.unsub = function(token) {
		for (var m in broadcasts) {
			if (broadcasts[m]) {
				for (var i = 0, j = broadcasts[m].length; i < j; i++) {
					if (broadcasts[m][i].token === token) {
						broadcasts[m].splice(i, 1);
						return token;
					}
				}
			}
		}
		return this;
	};
}(EventManager));

var uiDrawer = document.getElementById('drawer');
var drawerNavItems = drawerElement.querySelectorAll('input[type="radio"]');
var drawerHandle = document.getElementById('drawer-handle');


EventManager.subscribe('drawer.nav', drawer);
EventManager.subscribe('drawer.handle', drawerReceiver);

var drawerReceiver = function(message, data) {

}
