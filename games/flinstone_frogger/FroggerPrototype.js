(function () { "use strict";
var Main = function() {
	js.Browser.document.body.style.margin = "0 0 0";
	this.canvas = js.Browser.document.createElement("canvas");
	this.context = this.canvas.getContext("2d");
	this.canvas.width = 800;
	this.canvas.height = 600;
	this.canvas.style.backgroundColor = "#009900";
	js.Browser.document.body.appendChild(this.canvas);
	this.init();
	this.render();
};
Main.main = function() {
	new Main();
}
Main.prototype = {
	addEnemy: function(x,y,type) {
		this.enemyMap.push(new Enemy(x,y,type));
	}
	,addWood: function(x,y,type) {
		this.woodMap.push(new Wood(x,y,type));
	}
	,draw: function() {
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
		var _g = 0;
		while(_g < 9) {
			var y = _g++;
			var _g1 = 0;
			while(_g1 < 12) {
				var x = _g1++;
				if(this.tileMap[y][x] == 1) this.context.drawImage(this.grass,70 * x,70 * y,70,70);
				if(this.tileMap[y][x] == 2) this.context.drawImage(this.sand,70 * x,70 * y,70,70);
			}
		}
		this.context.drawImage(this.water,-100,365,1100,400);
		var _g = 0, _g1 = this.woodMap;
		while(_g < _g1.length) {
			var w = _g1[_g];
			++_g;
			this.context.drawImage(this.wood,w.x,w.y,this.wood.width,this.wood.height);
		}
		this.context.drawImage(this.hero,this.player.x,this.player.y,70,203);
		var _g = 0, _g1 = this.enemyMap;
		while(_g < _g1.length) {
			var e = _g1[_g];
			++_g;
			switch(e.type) {
			case "car":
				this.context.drawImage(this.car,e.x,e.y,this.car.width,this.car.height);
				break;
			case "dina":
				this.context.drawImage(this.dina,e.x,e.y,this.dina.width,this.dina.height);
				break;
			}
			if(this.player.y + 133 > e.y) this.context.drawImage(this.hero,this.player.x,this.player.y,70,203);
		}
	}
	,update: function() {
		var _g = 0, _g1 = this.woodMap;
		while(_g < _g1.length) {
			var w = _g1[_g];
			++_g;
			switch(w.type) {
			case "left":
				w.x -= 2;
				if(w.x < -221) w.x = 800;
				break;
			case "right":
				w.x += 2;
				if(w.x > 800) w.x = -221;
				break;
			}
		}
		var _g = 0, _g1 = this.enemyMap;
		while(_g < _g1.length) {
			var w = _g1[_g];
			++_g;
			w.x += 1;
			if(w.x > 800) w.x = -339;
		}
		this.player.y += 3;
		if(this.player.y > 600) this.player.y = -203;
	}
	,render: function() {
		requestAnimationFrame($bind(this,this.render));
		this.update();
		this.draw();
	}
	,init: function() {
		this.tileMap = [[1,1,0,0,1,0,1,1,0,0,0,0],[0,0,0,0,0,0,0,1,1,0,1,0],[0,1,0,0,0,0,0,0,1,0,0,0],[1,0,0,1,1,0,1,0,0,0,0,0],[2,2,2,2,2,2,2,2,2,2,2,2],[2,2,2,2,2,2,2,2,2,2,2,2],[0,0,0,0,0,0,0,0,0,0,0,0],[2,2,2,2,2,2,2,2,2,2,2,2],[0,0,0,0,0,0,0,0,0,0,0,0]];
		this.woodMap = [];
		this.enemyMap = [];
		this.hero = new Image();
		this.hero.src = "resources/flinstone.png";
		this.grass = new Image();
		this.grass.src = "resources/grass.png";
		this.sand = new Image();
		this.sand.src = "resources/sand.png";
		this.water = new Image();
		this.water.src = "resources/water.png";
		this.wood = new Image();
		this.wood.src = "resources/wood.png";
		this.dina = new Image();
		this.dina.src = "resources/dinazawrik.png";
		this.car = new Image();
		this.car.src = "resources/car.png";
		this.player = new Hero(350,-133);
		this.addWood(0,350,"right");
		this.addWood(300,350,"right");
		this.addWood(600,350,"right");
		this.addWood(390,420,"left");
		this.addWood(-45,420,"left");
		this.addWood(670,420,"left");
		this.addWood(-30,490,"right");
		this.addWood(270,490,"right");
		this.addWood(570,490,"right");
		this.addEnemy(100,0,"dina");
		this.addEnemy(600,40,"car");
	}
}
var Wood = function(x,y,type) {
	this.x = x;
	this.y = y;
	this.type = type;
};
var Hero = function(x,y) {
	this.x = x;
	this.y = y;
};
var Enemy = function(x,y,type) {
	this.x = x;
	this.y = y;
	this.type = type;
};
var js = {}
js.Browser = function() { }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; };
js.Browser.document = typeof window != "undefined" ? window.document : null;
Main.main();
})();
