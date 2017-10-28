function extend(obj, extension) {
	for (var key in extension) {
		obj[key] = extension[key];
	}
}

function ObserverList() {
	this.observerList = [];
};

ObserverList.prototype = {
	add: function(obj) {
		return this.observerList.push(obj);
	},

	count: this.length = function() {
		return this.observerList.length;
	},

	get: function(index) {
		if (index > -1 && index < this.observerList.length) {
			return this.observerList[index];
		}
	},

	indexOf: function(obj, startIndex) {
		var i = startIndex;

		while (i < this.observerList.length) {
			if (this.observerList[i] === obj) {
				return i;
			}
			i++;
		}

		return -1;
	},

	removeAt: function(index) {
		this.observerList.splice(index, 1);
	}
}

function Observer() {
	this.update = function() {
		console.log('Observer update function...');
	}
}

function Subject() {
	this.observers = new ObserverList();
}

Subject.prototype = {
	addObserver: function(observer) {
		this.observers.add(observer);
	},

	removeObserver: function(observer) {
		this.observers.removeAt(this.observers.indexOf(observer, 0));
	},

	notify: function(context) {
		var observerCount = this.observers.count();
		for (var i = 0; i < observerCount; i++) {
			this.observers.get(i).update(context);
		}
	}
};

var DrawerSwitch = document.getElementById('drawer-switch');

/*	Concrete Subjects & Observers		*/
extend(DrawerSwitch, new Subject());


DrawerSwitch.onclick = function() {
	var isChecked = this.checked;
	this.notify(isChecked);
};
