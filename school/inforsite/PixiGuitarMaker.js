(function () { "use strict";
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var Main = function() {
	this.loader = new PIXI.loaders.Loader();
	this.loader.baseUrl = "assets/";
	this.loader.add("body","body.png");
	this.loader.add("body_lp","body_lp.png");
	this.loader.add("body_prs","body_prs.png");
	this.loader.add("neck","neck.png");
	this.loader.add("neck_lp","neck_lp.png");
	this.loader.add("neck_prs","neck_prs.png");
	this.loader.add("pook","pook.jpg");
	this.loader.add("sunburst","sunburst.jpg");
	this.loader.add("greenburst","greenburst.jpg");
	this.loader.add("purpleburst","purpleburst.jpg");
	this.loader.add("black","black.jpg");
	this.loader.add("white","white.jpg");
	this.loader.load($bind(this,this.init));
};
Main.main = function() {
	new Main();
}
Main.prototype = {
	render: function() {
		js.Browser.window.requestAnimationFrame($bind(this,this.render));
		this.renderer.render(Main.stage);
		Main.stage.update();
	}
	,init: function() {
		var options = { };
		options.backgroundColor = 16777215;
		options.resolution = 1;
		options.autoResize = true;
		Main.stage = new stages.MainStage();
		this.renderer = PIXI.autoDetectRenderer(1024,768,options);
		//this.renderer.view.style.position = "absolute";
		this.renderer.view.style.width = "100%";
		this.renderer.view.style.height = "100%";
		js.Browser.document.getElementById("ses").appendChild(this.renderer.view);
		js.Browser.window.requestAnimationFrame($bind(this,this.render));
	}
}
var js = {}
js.Browser = function() { }
var stages = {}
stages.Stage = function() {
	PIXI.Container.call(this);
	this.init();
};
stages.Stage.__super__ = PIXI.Container;
stages.Stage.prototype = $extend(PIXI.Container.prototype,{
	update: function() {
	}
	,init: function() {
	}
});
stages.MainStage = function() {
	stages.Stage.call(this);
};
stages.MainStage.__super__ = stages.Stage;
stages.MainStage.prototype = $extend(stages.Stage.prototype,{
	update: function() {
	}
	,init: function() {
		var body;
		body = new PIXI.Sprite(PIXI.Texture.fromImage("assets/body_lp.png"));
		body.position = new PIXI.Point(400,100);
		var neck;
		neck = new PIXI.Sprite(PIXI.Texture.fromImage("assets/neck_lp.png"));
		neck.position = body.position;
		var bodyMask;
		bodyMask = new PIXI.Sprite(PIXI.Texture.fromImage("assets/pook.jpg"));
		bodyMask.x = body.x;
		bodyMask.y = 50;
		bodyMask.width = 196;
		bodyMask.mask = body;
		var fntStyle = { font : "20px Tahoma, sans-serif", align : "left", fill : "rgba(0,0,0,0.9)"};
		var lespaul = new PIXI.Text("Les Paul",fntStyle,2);
		lespaul.x = 280;
		lespaul.y = 10;
		lespaul.interactive = true;
		lespaul.on("click",function() {
			body.texture = PIXI.Texture.fromImage("assets/body_lp.png");
			neck.texture = PIXI.Texture.fromImage("assets/neck_lp.png");
		});
		var fender = new PIXI.Text("Stratocaster",fntStyle,2);
		fender.x = 430;
		fender.y = 10;
		fender.interactive = true;
		fender.on("click",function() {
			body.texture = PIXI.Texture.fromImage("assets/body.png");
			neck.texture = PIXI.Texture.fromImage("assets/neck.png");
		});
		var prs = new PIXI.Text("PRS 24",fntStyle,2);
		prs.x = 630;
		prs.y = 10;
		prs.interactive = true;
		prs.on("click",function() {
			body.texture = PIXI.Texture.fromImage("assets/body_prs.png");
			neck.texture = PIXI.Texture.fromImage("assets/neck_prs.png");
		});
		var leopard = new PIXI.Text("Леопардовый",fntStyle,2);
		leopard.x = 10;
		leopard.y = 150;
		leopard.interactive = true;
		leopard.on("click",function() {
			bodyMask.texture = PIXI.Texture.fromImage("assets/pook.jpg");
		});
		var sunburst = new PIXI.Text("Санберст",fntStyle,2);
		sunburst.x = 10;
		sunburst.y = 250;
		sunburst.interactive = true;
		sunburst.on("click",function() {
			bodyMask.texture = PIXI.Texture.fromImage("assets/sunburst.jpg");
		});
		var greenburst = new PIXI.Text("Зеленый",fntStyle,2);
		greenburst.x = 10;
		greenburst.y = 350;
		greenburst.interactive = true;
		greenburst.on("click",function() {
			bodyMask.texture = PIXI.Texture.fromImage("assets/greenburst.jpg");
		});
		var purpleburst = new PIXI.Text("Фиолетовый",fntStyle,2);
		purpleburst.x = 10;
		purpleburst.y = 450;
		purpleburst.interactive = true;
		purpleburst.on("click",function() {
			bodyMask.texture = PIXI.Texture.fromImage("assets/purpleburst.jpg");
		});
		var black = new PIXI.Text("Черный",fntStyle,2);
		black.x = 10;
		black.y = 550;
		black.interactive = true;
		black.on("click",function() {
			bodyMask.texture = PIXI.Texture.fromImage("assets/black.jpg");
		});
		var white = new PIXI.Text("Красный",fntStyle,2);
		white.x = 10;
		white.y = 650;
		white.interactive = true;
		white.on("click",function() {
			bodyMask.texture = PIXI.Texture.fromImage("assets/white.jpg");
		});
		this.addChild(body);
		this.addChild(bodyMask);
		this.addChild(neck);
		this.addChild(lespaul);
		this.addChild(fender);
		this.addChild(prs);
		this.addChild(leopard);
		this.addChild(sunburst);
		this.addChild(greenburst);
		this.addChild(purpleburst);
		this.addChild(black);
		this.addChild(white);
	}
});
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; };
js.Browser.window = typeof window != "undefined" ? window : null;
js.Browser.document = typeof window != "undefined" ? window.document : null;
Main.main();
})();
