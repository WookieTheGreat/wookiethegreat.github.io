(function () { "use strict";
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { }
HxOverrides.remove = function(a,obj) {
	var i = 0;
	var l = a.length;
	while(i < l) {
		if(a[i] == obj) {
			a.splice(i,1);
			return true;
		}
		i++;
	}
	return false;
}
var Main = function() {
	var _g = this;
	js.Browser.document.body.style.margin = "0 0 0";
	this.canvas = js.Browser.document.createElement("canvas");
	this.canvas.id = "wookie:canvas";
	this.context = this.canvas.getContext("2d");
	this.context.webkitImageSmoothingEnabled = false;
	this.context.mozImageSmoothingEnabled = false;
	this.context.imageSmoothingEnabled = false;
	this.canvas.style.width = "64px";
	this.canvas.width = this.canvas.height = 64;
	this.canvas.style.backgroundColor = "#000";
	this.canvas.style.position = "absolute";
	this.canvas.style.marginLeft = this.canvas.style.marginTop = "16px";
	js.Browser.document.getElementById("container").appendChild(this.canvas);
	Main.rect = this.canvas.getBoundingClientRect();
	js.Browser.document.addEventListener("keydown",function(e) {
		if(e.keyCode >= 49 && e.keyCode <= 57) _g.canvas.style.width = (e.keyCode - 48) * 64 + "px";
	},false);
	Main.game = new engine.Game(this.canvas,this.context);
	Main.game.currentRoom = new game.levels.Logo(this.context);
};
Main.main = function() {
	new Main();
}
var engine = {}
engine.Game = function(canvas,context) {
	var _g = this;
	this.canvas = canvas;
	this.context = context;
	this.currentRoom = new engine.Room(context);
	this.render();
	js.Browser.document.addEventListener("keyup",function(e) {
		_g.currentRoom.onKeyUp(e);
	},false);
	js.Browser.document.addEventListener("keydown",function(e) {
		_g.currentRoom.onKeyDown(e);
	},false);
	canvas.addEventListener("mouseup",function(e) {
		_g.currentRoom.onMouseUp(e);
	},false);
	canvas.addEventListener("mousedown",function(e) {
		_g.currentRoom.onMouseDown(e);
	},false);
	canvas.addEventListener("mousemove",function(e) {
		_g.currentRoom.onMouseMove(e);
	},false);
};
engine.Game.prototype = {
	setDelta: function() {
		this.now = Date.now();
		this.dt = (this.now - this.then) / 1000;
		this.then = this.now;
	}
	,render: function() {
		requestAnimationFrame($bind(this,this.render));
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
		this.currentRoom.onDraw();
		this.currentRoom.onUpdate(this.dt);
	}
}
engine.Graphics = function(context) {
	this.context = context;
};
engine.Graphics.prototype = {
	getPixel: function(x,y) {
		var imgData = this.context.getImageData(x,y,1,1);
		return imgData.data[0] + ", " + imgData.data[1] + ", " + imgData.data[2];
	}
	,restoreContext: function() {
		this.context.restore();
	}
	,saveContext: function() {
		this.context.save();
	}
	,setGlobalAlpha: function(alpha) {
		this.context.globalAlpha = alpha;
	}
	,setColor: function(r,g,b) {
		this.context.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")";
	}
	,setRect: function(x,y,w,h) {
		this.context.fillRect(x,y,w,h);
	}
	,drawImage: function(image,x,y,width,height) {
		this.context.drawImage(image,x,y,width,height);
	}
}
engine.Room = function(context) {
	this.graphics = new engine.Graphics(context);
	this.onLoad();
	this.context = context;
};
engine.Room.prototype = {
	onMouseMove: function(e) {
	}
	,onMouseDown: function(e) {
	}
	,onMouseUp: function(e) {
	}
	,onKeyDown: function(e) {
	}
	,onKeyUp: function(e) {
	}
	,onDraw: function() {
	}
	,onUpdate: function(dt) {
	}
	,onLoad: function() {
	}
}
var game = {}
game.levels = {}
game.levels.Congratulations = function(context) {
	engine.Room.call(this,context);
};
game.levels.Congratulations.__super__ = engine.Room;
game.levels.Congratulations.prototype = $extend(engine.Room.prototype,{
	onDraw: function() {
		this.graphics.drawImage(this.congrats,0,this.cy,64,5);
		this.graphics.drawImage(this.congratoo,0,this.c2y,64,5);
	}
	,onUpdate: function(dt) {
		this.cy -= 0.3;
		this.c2y -= 0.3;
		if(this.c2y < -20) Main.game.currentRoom = new game.levels.Menu(this.context);
	}
	,onLoad: function() {
		this.congrats = new Image();
		this.congrats.src = "icons/game_over.png";
		this.congratoo = new Image();
		this.congratoo.src = "icons/game_over_2.png";
		this.cy = 72;
		this.c2y = 144;
	}
});
game.levels.Crossroads = function(context) {
	engine.Room.call(this,context);
};
game.levels.Crossroads.__super__ = engine.Room;
game.levels.Crossroads.prototype = $extend(engine.Room.prototype,{
	addWood: function(x,y,direction) {
		this.woodArray.push(new game.objects.Wood(x,y,direction));
	}
	,addCar: function(x,y,direction,type) {
		this.carsArray.push(new game.objects.Car(x,y,direction,type));
	}
	,onKeyDown: function(e) {
		switch(e.keyCode) {
		case 87:
			this.jake.y -= 1;
			if(this.graphics.getPixel(this.jake.x + 1,this.jake.y + 7) == "3, 57, 99") Main.game.currentRoom = new game.levels.Crossroads(this.context);
			break;
		case 65:
			this.jake.x -= 1;
			if(this.graphics.getPixel(this.jake.x + 1,this.jake.y + 7) == "3, 57, 99") Main.game.currentRoom = new game.levels.Crossroads(this.context);
			break;
		case 83:
			if(this.jake.y < 57) this.jake.y += 1;
			if(this.graphics.getPixel(this.jake.x + 1,this.jake.y + 7) == "3, 57, 99") Main.game.currentRoom = new game.levels.Crossroads(this.context);
			break;
		case 68:
			this.jake.x += 1;
			if(this.graphics.getPixel(this.jake.x + 1,this.jake.y + 7) == "3, 57, 99") Main.game.currentRoom = new game.levels.Crossroads(this.context);
			break;
		case 37:
			this.elwood.x -= 1;
			if(this.graphics.getPixel(this.elwood.x + 1,this.elwood.y + 9) == "3, 57, 99") Main.game.currentRoom = new game.levels.Crossroads(this.context);
			break;
		case 38:
			this.elwood.y -= 1;
			if(this.graphics.getPixel(this.elwood.x + 1,this.elwood.y + 9) == "3, 57, 99") Main.game.currentRoom = new game.levels.Crossroads(this.context);
			break;
		case 39:
			this.elwood.x += 1;
			if(this.graphics.getPixel(this.elwood.x + 1,this.elwood.y + 9) == "3, 57, 99") Main.game.currentRoom = new game.levels.Crossroads(this.context);
			break;
		case 40:
			if(this.elwood.y < 55) this.elwood.y += 1;
			if(this.graphics.getPixel(this.elwood.x + 1,this.elwood.y + 9) == "3, 57, 99") Main.game.currentRoom = new game.levels.Crossroads(this.context);
			break;
		case 82:
			Main.game.currentRoom = new game.levels.Crossroads(this.context);
			break;
		}
	}
	,onDraw: function() {
		this.graphics.drawImage(this.levelMap,0,0,64,64);
		var _g = 0, _g1 = this.carsArray;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			this.graphics.drawImage(c.carImage,c.x,c.y,10,6);
		}
		var _g = 0, _g1 = this.woodArray;
		while(_g < _g1.length) {
			var w = _g1[_g];
			++_g;
			this.graphics.drawImage(w.woodImage,w.x,w.y,6,3);
		}
		this.graphics.drawImage(this.jake.broImage,this.jake.x,this.jake.y,3,7);
		this.graphics.drawImage(this.elwood.broImage,this.elwood.x,this.elwood.y,3,9);
	}
	,onUpdate: function(dt) {
		var _g = 0, _g1 = this.carsArray;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			switch(c.direction) {
			case "left":
				c.x -= 0.5;
				if(c.x < -10) c.x = 64;
				break;
			case "right":
				c.x += 0.5;
				if(c.x > 64) c.x = -10;
				break;
			}
			if(utils.BoundingBox.Collision(c.x,c.y,10,6,this.jake.x,this.jake.y + 6,3,1)) Main.game.currentRoom = new game.levels.Crossroads(this.context);
			if(utils.BoundingBox.Collision(c.x,c.y,10,6,this.elwood.x,this.elwood.y + 8,3,1)) Main.game.currentRoom = new game.levels.Crossroads(this.context);
		}
		var _g = 0, _g1 = this.woodArray;
		while(_g < _g1.length) {
			var w = _g1[_g];
			++_g;
			switch(w.direction) {
			case "left":
				w.x -= 0.3;
				if(w.x < -6) w.x = 64;
				break;
			case "right":
				w.x += 0.3;
				if(w.x > 64) w.x = -6;
				break;
			}
			if(utils.BoundingBox.Collision(w.x,w.y,6,3,this.jake.x,this.jake.y + 6,3,1)) {
				if(w.direction == "left") this.jake.x -= 0.3; else this.jake.x += 0.3;
			}
			if(utils.BoundingBox.Collision(w.x,w.y,6,3,this.elwood.x,this.elwood.y + 8,3,1)) {
				if(w.direction == "left") this.elwood.x -= 0.3; else this.elwood.x += 0.3;
			}
		}
		if(this.jake.x < -3 || this.jake.x > 64) Main.game.currentRoom = new game.levels.Crossroads(this.context);
		if(this.elwood.x < -3 || this.elwood.x > 64) Main.game.currentRoom = new game.levels.Crossroads(this.context);
		if(this.jake.y < -7 && this.elwood.y < -9) Main.game.currentRoom = new game.levels.Congratulations(this.context);
	}
	,onLoad: function() {
		this.carsArray = [];
		this.woodArray = [];
		this.levelMap = new Image();
		this.levelMap.src = "levels/level_2.png";
		this.jake = new game.objects.Brother("jake",14,56);
		this.elwood = new game.objects.Brother("el",50,54);
		this.addCar(0,25,"right",1);
		this.addCar(64,39,"left",2);
		this.addCar(32,55,"right",3);
		this.addWood(0,15,"right");
		this.addWood(10,15,"right");
		this.addWood(30,15,"right");
		this.addWood(50,15,"right");
		this.addWood(10,46,"left");
		this.addWood(20,46,"left");
		this.addWood(40,46,"left");
		this.addWood(60,46,"left");
	}
});
game.levels.Delta = function(context) {
	engine.Room.call(this,context);
};
game.levels.Delta.__super__ = engine.Room;
game.levels.Delta.prototype = $extend(engine.Room.prototype,{
	random: function(min,max) {
		return Math.floor(Math.random() * (max - min + 1)) + 1;
	}
	,addRect: function(x,y,w,h) {
		this.rectArray.push([x,y,w,h]);
	}
	,addTree: function(x,y,type) {
		this.treeArray.push(new game.objects.Tree(x,y,type));
	}
	,onKeyDown: function(e) {
		switch(e.keyCode) {
		case 87:
			if(this.jake.y > -5) this.jake.y -= 1;
			if(this.graphics.getPixel(this.jake.x + 1,this.jake.y + 7) == "3, 57, 99") this.jake.y += 1;
			break;
		case 65:
			if(this.jake.x > -1) this.jake.x -= 1;
			if(this.graphics.getPixel(this.jake.x + 1,this.jake.y + 7) == "3, 57, 99") this.jake.x += 1;
			break;
		case 83:
			if(this.jake.y < 60) this.jake.y += 1;
			if(this.graphics.getPixel(this.jake.x + 1,this.jake.y + 7) == "3, 57, 99") this.jake.x -= 1;
			break;
		case 68:
			this.jake.x += 1;
			if(this.graphics.getPixel(this.jake.x + 1,this.jake.y + 7) == "3, 57, 99") this.jake.x -= 1;
			break;
		case 90:
			var _g = 0, _g1 = this.treeArray;
			while(_g < _g1.length) {
				var d = _g1[_g];
				++_g;
				if(utils.BoundingBox.Collision(this.jake.x,this.jake.y,3,7,d.x,d.y,d.treeImage.width,d.treeImage.height)) {
					HxOverrides.remove(this.treeArray,d);
					this.jakesWood++;
				}
			}
			break;
		case 88:
			if(this.jakesWood > 0) {
				this.addRect(this.jake.x - 1,this.jake.y + 5,5,5);
				this.jakesWood--;
				console.log(this.jakesWood);
			}
			break;
		case 37:
			if(this.elwood.x > -1) this.elwood.x -= 1;
			if(this.graphics.getPixel(this.elwood.x + 1,this.elwood.y + 9) == "3, 57, 99") this.elwood.x += 1;
			break;
		case 38:
			if(this.elwood.y > -7) this.elwood.y -= 1;
			if(this.graphics.getPixel(this.elwood.x + 1,this.elwood.y + 9) == "3, 57, 99") this.elwood.y += 1;
			break;
		case 39:
			this.elwood.x += 1;
			if(this.graphics.getPixel(this.elwood.x + 1,this.elwood.y + 9) == "3, 57, 99") this.elwood.x -= 1;
			break;
		case 40:
			if(this.elwood.y < 60) this.elwood.y += 1;
			if(this.graphics.getPixel(this.elwood.x + 1,this.elwood.y + 9) == "3, 57, 99") this.elwood.y -= 1;
			break;
		case 67:
			var _g = 0, _g1 = this.treeArray;
			while(_g < _g1.length) {
				var d = _g1[_g];
				++_g;
				if(utils.BoundingBox.Collision(this.elwood.x,this.elwood.y,3,9,d.x,d.y,d.treeImage.width,d.treeImage.height)) {
					HxOverrides.remove(this.treeArray,d);
					this.elsWood++;
				}
			}
			break;
		case 86:
			if(this.elsWood > 0) {
				this.addRect(this.elwood.x - 1,this.elwood.y + 7,5,5);
				this.elsWood--;
			}
			break;
		case 82:
			Main.game.currentRoom = new game.levels.Delta(this.context);
			break;
		}
	}
	,onMouseUp: function(e) {
		var mouse_x = e.clientX - Main.rect.left;
		var mouse_y = e.clientY - Main.rect.top;
		console.log(this.graphics.getPixel(mouse_x,mouse_y));
	}
	,onDraw: function() {
		this.graphics.drawImage(this.map,0,0,64,64);
		var _g = 0, _g1 = this.rectArray;
		while(_g < _g1.length) {
			var r = _g1[_g];
			++_g;
			this.graphics.setColor(99,71,3);
			this.graphics.setRect(r[0],r[1],r[2],r[3]);
		}
		var _g = 0, _g1 = this.treeArray;
		while(_g < _g1.length) {
			var v = _g1[_g];
			++_g;
			this.graphics.drawImage(v.treeImage,v.x,v.y,v.treeImage.width,v.treeImage.height);
		}
		this.graphics.drawImage(this.jake.broImage,this.jake.x,this.jake.y,3,7);
		this.graphics.drawImage(this.elwood.broImage,this.elwood.x,this.elwood.y,3,9);
	}
	,onUpdate: function(dt) {
		if(this.elwood.x > 64 && this.jake.x > 64) Main.game.currentRoom = new game.levels.Crossroads(this.context);
	}
	,onLoad: function() {
		this.treeArray = [];
		this.rectArray = [];
		this.pointArray = [[14,1],[35,1],[42,1],[1,2],[12,2],[39,2],[58,2],[10,4],[55,4],[16,5],[43,5],[53,6],[50,7],[46,8],[22,9],[12,12],[20,12],[1,13],[24,13],[19,15],[25,15],[22,16],[6,17],[17,19],[27,21],[25,24],[1,26],[6,26],[13,27],[21,29],[30,31],[19,33],[1,35],[18,37],[14,38],[33,38],[37,40],[17,41],[61,41],[54,42],[23,43],[58,43],[20,44],[34,44],[35,46],[16,51],[20,51],[7,55],[9,55],[4,60],[2,61]];
		this.jakesWood = this.elsWood = 0;
		this.map = new Image();
		this.map.src = "levels/level_1.png";
		this.jake = new game.objects.Brother("jake",14,0);
		this.elwood = new game.objects.Brother("el",3,52);
		var _g = 0, _g1 = this.pointArray;
		while(_g < _g1.length) {
			var v = _g1[_g];
			++_g;
			var rand = this.random(1,5);
			var height = 10;
			switch(rand) {
			case 1:
				height = 10;
				break;
			case 2:
				height = 9;
				break;
			case 3:
				height = 8;
				break;
			case 4:
				height = 7;
				break;
			case 5:
				height = 8;
				break;
			}
			this.addTree(v[0] - 3,v[1] - height,rand);
		}
	}
});
game.levels.Logo = function(context) {
	engine.Room.call(this,context);
};
game.levels.Logo.__super__ = engine.Room;
game.levels.Logo.prototype = $extend(engine.Room.prototype,{
	onDraw: function() {
		this.graphics.drawImage(this.igdc,this.pos,0,64,64);
	}
	,onUpdate: function(dt) {
		this.pos += this.speed;
		if(this.pos > 64) Main.game.currentRoom = new game.levels.Menu(this.context);
	}
	,onLoad: function() {
		this.pos = -64;
		this.speed = 0.4;
		this.igdc = new Image();
		this.igdc.src = "icons/igdc.png";
	}
});
game.levels.Menu = function(context) {
	engine.Room.call(this,context);
};
game.levels.Menu.__super__ = engine.Room;
game.levels.Menu.prototype = $extend(engine.Room.prototype,{
	onKeyDown: function(e) {
		if(e.keyCode == 88) Main.game.currentRoom = new game.levels.Delta(this.context);
	}
	,onDraw: function() {
		this.graphics.drawImage(this.bros,0,0,64,64);
	}
	,onUpdate: function(dt) {
	}
	,onLoad: function() {
		this.bros = new Image();
		this.bros.src = "icons/blues_brothers.png";
	}
});
game.objects = {}
game.objects.Brother = function(bro,x,y) {
	this.broImage = new Image();
	this.broImage.src = "icons/players/" + bro + ".png";
	this.x = x;
	this.y = y;
};
game.objects.Car = function(x,y,direction,type) {
	this.carImage = new Image();
	this.carImage.src = "icons/cars/car_" + type + ".png";
	this.x = x;
	this.y = y;
	this.direction = direction;
};
game.objects.Tree = function(x,y,type) {
	this.treeImage = new Image();
	this.treeImage.src = "icons/trees/tree_" + type + ".png";
	this.x = x;
	this.y = y;
};
game.objects.Wood = function(x,y,direction) {
	this.woodImage = new Image();
	this.woodImage.src = "icons/cars/wood.png";
	this.x = x;
	this.y = y;
	this.direction = direction;
};
var js = {}
js.Browser = function() { }
var utils = {}
utils.BoundingBox = function() {
};
utils.BoundingBox.Collision = function(box1x,box1y,box1w,box1h,box2x,box2y,box2w,box2h) {
	if(box1x > box2x + box2w - 1 || box1y > box2y + box2h - 1 || box2x > box1x + box1w - 1 || box2y > box1y + box1h - 1) return false; else return true;
}
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; };
if(Array.prototype.indexOf) HxOverrides.remove = function(a,o) {
	var i = a.indexOf(o);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
js.Browser.document = typeof window != "undefined" ? window.document : null;
Main.main();
})();
