// Pub/Sub implementation to handle UI event firing/listening
var Switchboard = {
	switchList: {},

	subscribe: function(switchId, listener) {
		// create the switchId if not yet created
		if (!this.switchList[switchId]) this.switchList[switchId] = [];

		// add the listener
		this.switchList[switchId].push(listener);
	},

	publish: function(switchId, status) {
		// return if the switchId doesn't exist, or there are no listeners
		if (!this.switchList[switchId] || this.switchList[switchId].length < 1) return;

		// send the event to all listeners
		this.switchList[switchId].forEach(function(listener) {
			listener(status || {});
		});
	}
};
// Independent on/off switches ( i.e. input[type="checkbox"] )
var CheckboxSwitch = function(id) {
	this.checkbox = document.getElementById(id);
};
CheckboxSwitch.prototype = {
	flipSwitch: function() {
		if (this.checkbox.checked) {
			return this.checkbox.checked = false;
		}
		return this.checkbox.checked = true;
	}
};
// Single-selection groups of switches ( i.e. input[type="radio"] )
var MultiSwitch = {};

var drawerSwitch = new CheckboxSwitch("drawer-switch");
