(function () { "use strict";
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var Main = function() {
	this.loader = new PIXI.loaders.Loader();
	this.loader.baseUrl = "art/";
	this.loader.add("sky","background/sky2.png");
	this.loader.add("btn","gui/button.png");
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
		options.backgroundColor = 17895697;
		options.resolution = 1;
		options.autoResize = true;
		Main.stage = new stages.MainScene();
		this.renderer = PIXI.autoDetectRenderer(1024,768,options);
		this.renderer.view.style.position = "absolute";
		this.renderer.view.style.width = "100%";
		this.renderer.view.style.height = "100%";
		js.Browser.document.body.appendChild(this.renderer.view);
		js.Browser.window.requestAnimationFrame($bind(this,this.render));
	}
}
var gui = {}
gui.Button = function(fill,style,event) {
	PIXI.Container.call(this);
	this.tex = new PIXI.Sprite(PIXI.Texture.fromImage("art/gui/button.png"));
	this.tex.on("click",event);
	this.tex.interactive = true;
	this.txt = new PIXI.Text(fill,style,1);
	this.txt.position = new PIXI.Point(15,15);
	var graphics = new PIXI.Graphics();
	graphics.beginFill(-1616928865,0.0);
	graphics.lineStyle(3,0,0.3);
	graphics.moveTo(-1,-1);
	graphics.lineTo(144,-1);
	graphics.lineTo(144,48);
	graphics.lineTo(-1,48);
	graphics.endFill();
	graphics.beginFill(-1616928865,0.0);
	graphics.lineStyle(3,16777215,0.8);
	graphics.moveTo(0,0);
	graphics.lineTo(143,0);
	graphics.lineTo(143,47);
	graphics.lineTo(0,47);
	graphics.endFill();
	this.tex.addChild(graphics);
	this.addChild(this.tex);
	this.addChild(this.txt);
};
gui.Button.__super__ = PIXI.Container;
gui.Button.prototype = $extend(PIXI.Container.prototype,{
});
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
stages.MainScene = function() {
	stages.Stage.call(this);
};
stages.MainScene.__super__ = stages.Stage;
stages.MainScene.prototype = $extend(stages.Stage.prototype,{
	setEpText: function(ep) {
		this.tba.text = this.epArray[ep];
	}
	,setText: function() {
		this.tb.text = this.charArray[this.currentName][this.currentRow];
		console.log(this.currentName + "  " + this.currentRow);
	}
	,update: function() {
		if(this.alpha <= 1) this.alpha += 0.008;
	}
	,init: function() {
		var _g = this;
		this.alpha = 0;
		this.state = 1;
		this.currentName = 0;
		this.currentRow = 0;
		this.currentEp = 0;
		this.charArray = [["Петр Кириллович Безухов","''Массивный, толстый молодой человек с стриженою головой, в очках''.","Внебрачный сын графа Кирилла Владимировича Безухова, наследник всего его состояния. Чиновник. С 1808 года - мас-\nон. Позже становится главой петербуржских масонов.","Робок, застенчив, неуклюж. Обладает добрым сердцем. Несколько раз переживает экзистенциальный кризис\n (''ничто не правда''), переосмысляет свои взгляды. В 1808 году встречается с масоном Баздеевым, загорается идеями\nэтого религиозного течения, позже несколько разочаровывается в нем\nВажный момент в становлении характера Пьера - участие в войне 1812 года, пленение, в котором встречается с другим\nузником, Каратаевым, в котором видит самоотверженного и добродушного человека. После войны 1812 года\n - участник революционных кружков.\nСтрашен в гневе, однако, разозлить его очень и очень трудно.","В дворянском обществе находится в тени своей жены, слывет чудаком; после получения состояния отца\nобнаруживает, что каждый что-то от него хочет.\nВ масонстве становится негласным лидером в Петербурге, однако его это\nмало радует. Его старый друг - Андрей Болконский, тот не разделяет\nего взглядов по поводу крепостничества и масонского покровительства, однако, исполняет у себя в поместьях то, что\nне получается у самого Пьера."],["Елена Васильевна Курагина/Безухова","''Элен была так хороша, что не только не было в ней заметно и тени кокетства, но, напротив, ей как будто совестно\nбыло за свою несомненную и слишком сильно и победительно действующую крастоу. Она как будто желала и не могла\nумалить действие своей красоты''\n''она прошла ... предоставляя каждому право любоваться красотою своего стана, полных плеч, очень открытой, по\nтогдашней моде, груди и спины.''","Дочь князя Василия Курагина, после смерти Кирилла Безухова - жена Пьера, умирает от постыдной болезни в период\nвойны 1812 года.","Кроме наружной красоты в ней ничего нет, изнутри она глупа и грязна.","Одна из самых красивых женщин дворянского общества, в полную меру отыгрывается на своем муже, показывает\nсвой контраст с ним, имеет множество воздыхателей.\nКажется людям умной, что в действительности совсем не так."],["Андрей Николаевич Болконский","Вечер Шерер, 1805 г.\n''... был небольшого роста, весьма красивый молодой человек с определенными и сухими чертами. Все в его фигуре,\nначиная от усталого, скучающего взгляда до тихого мерного шага представляло ... противоположность с его\nоживленную женой. Ему, видимо, все бывшие в гостиной надоели так, что смотреть на них и слушать их ему\nбыло очень скучно''.","Дворянин, в 1805 г. служит, после Аустерлица прекращает, в 1811 году возобновляет службу.","Подробнее в соответствующей таблице 'Искания князя Андрея'.","Уважаем своим старым другом Пьером Безуховым. В военном обществе равные по чину относятся к нему с негласным\nпочтением. Находится в напряженных отношениях с отцом с момента помолвки с Наташей Ростовой."],["Наталья Ильинишна Ростова/Безухова","Именины Натальи, 1805 г.\n''Черноглазая, с большим ртом, некрасивая, но живая девочка''\nХорошеет по мере взросления.","Девушка из дворянского рода Ростовых, с 1810 по 1811 гг. - невеста князя Андрея Болконского, после 1812 года\n - жена Пьера Безухова.","Живет сердцем, добрая, отзывчивая, не задумчивая, как Болконские, но и не малодушная, как Курагины.","Любима семьей и окружающими, до князя Андрея к ней пытался свататься сослуживец брата Николая, Денисов. С 1812\n года имеет доверительные отношения с Марьей Болконской. Дружит с двоюродной сестрой Соней, ссорится во время\nпланируемого побега с Анатолием."],["Софья","Именины Натальи, 1805 г.\n''Соня была тоненькая, миниатюрненькая брюнетка с мягким, отененным длинными ресницами взглядом, густою черною\nкосою, два раза обвивающей ее голову. Плавностью движений, мягкостью и гибкостью маленьких членов и несколько\nхитрою и сдержанною манерой она напоминала красивого, но не сформировавшегося котенка, который будет прелестн-\nой кошечкой.''\n''кошечка''","Родственница, воспитанница Ростовых, сирота.","Испытывает привязанность к Ростовым, особенно к Николаю. Чувствует, что обязана всем своим родственникам,\nпоэтому оказывает им почтение. Верная, живет в смирении. 'Кошечка' не только внешне, но и внутренне.","Ее любит Николай Ростов, из-за нее происходит разлад между Николаем и Долоховым, в ходе которого Николай\nпроигрывает значительную сумму. В тяжелые для Ростовых времена подвергается нападкам со стороны старой графини."],["Анатолий Васильевич Курагин","''Когда она взглянула на него, крастота его поразила ее. Анатоль, заложив большой палец правой руки за пуговицу мун-\nдира, с выгнутой вперед грудью, а назад - спиной, покачивая одной отставленной ногой, молча, весело глядел на княжну.\n Анатоль был не находчив, не быстр и не красноречив в разговорах, но у него зато была драгоценная для света\n способность спокойствия и ничем не изменяемая уверенность.''","Один из двух сыновей князя Василия Курагина, служит, находится в браке с полячкой.","'На всю жизнь он смотрел как на непрерывное увеселение, которое кто-то такой почему-то обязался устроить для него.''\n","Умеет создавать ложное впечатление, так же, как и сестра. Влюбляет в себя m-le Burrien, Марью Болконскую,\nНаташу Ростову. Князь Андрей собирался вызвать Анатоля на дуэль."],["Мария Николаевна Болконская/Ростова","сватовство Курагиных:\n''Нехорошо было не платье, но лицо и вся фигура княжны.''\n\n","Девушка из дворянского рода Болконских, дочь Николая Андреевича Болконского, сестра князя Андрея. После 1812\n года - жена Николая Ростова.","После разочарования в Анатоле решает посвятить себя духовенству, в какой-то момент даже собирается оставить\nпрежнюю жизнь и стать странницей. Как и все Болконские, живет больше разумом.","Вела дружбу с Жюли Карагиной, но встретившись с ней воочию, разочаровалась в ней. Во время крестьянских волнений\nзнакомится с Николаем Ростовым, с которым у нее возникают теплые чувства. Подвергалась нападкам со стороны отца,\nно на смертном одре тот просит у нее прощения за прежнее обращение с ней."],["Николай Ильич Ростов","Именины, 1805 г.\n''Николай был невысокий курчавый молодой человек с открытым выражением лица. На верхней\nгубе его уже показывались черные волосики, и во всем лице выражались стремительность и восторженность.\n\nОтпуск после Аустерлица.\n''Николай Ростов был принят домашними как лучший сын, герой и ненаглядный Николушка; родными - как\nмилый, приятный и почтительный молодой человек; знакомыми - как красивый гусарский поручик, ловкий танцор и один\n из лучших женихов Москвы.''","До 1805 года - студент, во время австрийского похода Наполеона - юнкер, на момент войны 1812 года - ротмистр.","Так же, как и все Ростовы, живет больше сердцем, чем разумом.","Любим со стороны семьи, в том числе, семьи военной. В 1812 году встречает Марию Болконскую."]];
		this.epArray = ["Раненый Андрей лежит на Праценской горе, он ничего не видит кроме неизмеримо высокого неба с тихо ползущими по\nнему серыми облаками. Князь Андрей думает: ''Как тихо, спокойно, торжественно, совсем не так, как мы бежали,\nкричали и дрались; ... Как же я не видел прежде этого высокого неба? И как я счастлив, что узнал его наконец. Да!\nвсе пустое, все обман, кроме этого бесконечного неба. Ничего, ничего нет кроме его. Но и того даже нет, ничего нет,\nкроме тишины, успокоения. И слава богу!..''","Болконский попадает в плен к французам, оправившись от ранения он отъезжает домой и прибывает туда как раз к родам\nжены. Маленькая княгиня умирает при родах, на ее лице запечатлен укор, она будто бы говорит\n- ''Зачем вы со мной это сделали?''. После увиденного под Аустерлицем князь Андрей решает оставить военную службу,\nчто приветствуется его отцом. Андрей живет в Богучарове, воспитывает новорожденного сына, ведет хозяйство.\nОн выглядит нездоровым, в его характере проявляются черты отца Николая Андреевича.","В Богучарово к Андрею приезжает Пьер, окрыленный идеями масонства. На переправе через реку у них складывается\nразговор, в котором они рассуждают о ценностях, нужных человеку, Пьер утверждает, что надо жить\nво благо других; Андрей желает жить лишь во имя своей семьи, ни кого не трогая, не делая никому зла; Пьер расска-\n-зывает о том, что он проводит в деревне: отпускает крестьян вольными хлебопашцами, открывает школы и больницы,\nна что Андрей отвечает - крестьянам это совершенно не нужно; Пьер указывает другу\nна небо и тот снова видит 'то высокое, вечное небо', что-то 'давно заснувшее, что-то лучшее, что было в нем вдруг\nрадостно и молодо проснулось в его душе.'.\n' Свидание с Пьером было для князя Андрея эпохой, с которой началась хотя во внешности и та же самая,\nно во внутреннем мире его новая жизнь.'","","","","","",""];
		this.tableContainer = new PIXI.Container();
		this.andreyContainer = new PIXI.Container();
		var styleWhiteItalic = { font : "italic 30px Times New Roman", align : "left", fill : "#fff", dropShadow : true, dropShadowColor : "rgba(0,0,0,0.5)", dropShadowDistance : 2};
		var styleAuthor = { font : "italic 15px Times New Roman", align : "left", fill : "#fff", dropShadow : true, dropShadowColor : "rgba(0,0,0,0.5)", dropShadowDistance : 2};
		var styleContent = { font : "15px Times New Roman", align : "left", fill : "#fff", dropShadow : true, dropShadowColor : "rgba(0,0,0,0.5)", dropShadowDistance : 2};
		this.sky = new PIXI.Sprite(PIXI.Texture.fromImage("art/background/sky2.png"));
		this.sky.width = 1024;
		this.sky.height = 768;
		this.quote = new PIXI.Text("''Это - великое произведение великого писателя и это - подлинная Россия.''",styleWhiteItalic,1);
		this.quote.position = new PIXI.Point(25,15);
		this.aq = new PIXI.Text("- И. С. Тургенев",styleAuthor,1);
		this.aq.position = new PIXI.Point(865,50);
		this.copyright = new PIXI.Text("Подготовил Антон Завьялов",{ font : "10px Tahoma", fill : "rgba(255, 255, 255, 0.7)"},2);
		this.copyright.position = new PIXI.Point(875,745);
		this.button = new gui.Button("Искания князя Болконского",styleAuthor,function() {
			switch(_g.state) {
			case 0:
				_g.removeChild(_g.andreyContainer);
				_g.addChild(_g.tableContainer);
				_g.state = 1;
				_g.button.txt.text = "Искания князя Болконского";
				break;
			case 1:
				_g.removeChild(_g.tableContainer);
				_g.addChild(_g.andreyContainer);
				_g.state = 0;
				_g.button.txt.text = "  Таблица образов эпопеи";
				break;
			}
		});
		this.button.txt.x -= 3;
		this.button.tex.width += 55;
		this.button.x = 125;
		this.button.y = 715;
		this.chname = new gui.Button("Ф.И.О.",styleAuthor,function() {
			_g.currentRow = 0;
			_g.setText();
		});
		this.chname.txt.x += 40;
		this.chname.tex.width += 15;
		this.chname.x = 185;
		this.chname.y = 145;
		this.portrait = new gui.Button("Портрет",styleAuthor,function() {
			_g.currentRow = 1;
			_g.setText();
		});
		this.portrait.txt.x += 30;
		this.portrait.tex.width += 15;
		this.portrait.x = 350;
		this.portrait.y = 145;
		this.social = new gui.Button("Социальный статус",styleAuthor,function() {
			_g.currentRow = 2;
			_g.setText();
		});
		this.social.tex.width += 15;
		this.social.x = 515;
		this.social.y = 145;
		this.character = new gui.Button("Характер, взгляды",styleAuthor,function() {
			_g.currentRow = 3;
			_g.setText();
		});
		this.character.txt.x += 2;
		this.character.tex.width += 15;
		this.character.x = 680;
		this.character.y = 145;
		this.opinion = new gui.Button("Мнение окружающих",styleAuthor,function() {
			_g.currentRow = 4;
			_g.setText();
		});
		this.opinion.txt.x -= 5;
		this.opinion.tex.width += 15;
		this.opinion.x = 845;
		this.opinion.y = 145;
		this.petr = new gui.Button("Пьер Безухов",styleAuthor,function() {
			_g.currentName = 0;
			_g.setText();
		});
		this.petr.txt.x += 20;
		this.petr.tex.width += 15;
		this.petr.x = 25;
		this.petr.y = 245;
		this.elen = new gui.Button("Элен Курагина",styleAuthor,function() {
			_g.currentName = 1;
			_g.setText();
		});
		this.elen.txt.x += 20;
		this.elen.tex.width += 15;
		this.elen.x = 25;
		this.elen.y = 295;
		this.andrey = new gui.Button("Андрей Болконский",styleAuthor,function() {
			_g.currentName = 2;
			_g.setText();
		});
		this.andrey.txt.x += 5;
		this.andrey.tex.width += 15;
		this.andrey.x = 25;
		this.andrey.y = 345;
		this.natasha = new gui.Button("Наташа Ростова",styleAuthor,function() {
			_g.currentName = 3;
			_g.setText();
		});
		this.natasha.txt.x += 5;
		this.natasha.tex.width += 15;
		this.natasha.x = 25;
		this.natasha.y = 395;
		this.sonya = new gui.Button("Соня",styleAuthor,function() {
			_g.currentName = 4;
			_g.setText();
		});
		this.sonya.txt.x += 45;
		this.sonya.tex.width += 15;
		this.sonya.x = 25;
		this.sonya.y = 445;
		this.anatoly = new gui.Button("Анатоль Курагин",styleAuthor,function() {
			_g.currentName = 5;
			_g.setText();
		});
		this.anatoly.txt.x += 10;
		this.anatoly.tex.width += 15;
		this.anatoly.x = 25;
		this.anatoly.y = 495;
		this.maria = new gui.Button("Марья Болконская",styleAuthor,function() {
			_g.currentName = 6;
			_g.setText();
		});
		this.maria.txt.x += 5;
		this.maria.tex.width += 15;
		this.maria.x = 25;
		this.maria.y = 545;
		this.nikolay = new gui.Button("Николай Ростов",styleAuthor,function() {
			_g.currentName = 7;
			_g.setText();
		});
		this.nikolay.txt.x += 10;
		this.nikolay.tex.width += 15;
		this.nikolay.x = 25;
		this.nikolay.y = 595;
		this.skyau = new gui.Button("Небо под Аустерлицем",styleAuthor,function() {
			_g.setEpText(0);
		});
		this.skyau.x = 10;
		this.skyau.y = 185;
		this.skyau.tex.width += 35;
		this.peace = new gui.Button("Богатство мирной жизни",styleAuthor,function() {
			_g.setEpText(1);
		});
		this.peace.x = 10;
		this.peace.y = 235;
		this.peace.txt.x -= 12;
		this.peace.tex.width += 35;
		this.bogucharovo = new gui.Button("Разговор в Богучарове",styleAuthor,function() {
			_g.setEpText(2);
		});
		this.bogucharovo.x = 10;
		this.bogucharovo.y = 285;
		this.bogucharovo.tex.width += 35;
		this.meeting = new gui.Button("Встреча в Отрадном",styleAuthor,function() {
			_g.setEpText(3);
		});
		this.meeting.x = 10;
		this.meeting.y = 335;
		this.meeting.txt.x += 5;
		this.meeting.tex.width += 35;
		this.love = new gui.Button("Любовь к Наташе",styleAuthor,function() {
			_g.setEpText(4);
		});
		this.love.x = 10;
		this.love.y = 385;
		this.love.txt.x += 15;
		this.love.tex.width += 35;
		this.war = new gui.Button("Война 1812 года",styleAuthor,function() {
			_g.setEpText(5);
		});
		this.war.x = 10;
		this.war.y = 435;
		this.war.txt.x += 15;
		this.war.tex.width += 35;
		this.redemption = new gui.Button("Прощение Курагина",styleAuthor,function() {
			_g.setEpText(6);
		});
		this.redemption.x = 10;
		this.redemption.y = 485;
		this.redemption.txt.x += 10;
		this.redemption.tex.width += 35;
		this.remission = new gui.Button("Возрождение любви",styleAuthor,function() {
			_g.setEpText(7);
		});
		this.remission.x = 10;
		this.remission.y = 535;
		this.remission.txt.x += 10;
		this.remission.tex.width += 35;
		this.death = new gui.Button("",styleAuthor,function() {
			_g.setEpText(8);
		});
		this.death.x = 10;
		this.death.y = 585;
		this.death.tex.width += 35;
		this.addChild(this.sky);
		this.addChild(this.quote);
		this.addChild(this.aq);
		this.addChild(this.copyright);
		this.addChild(this.button);
		this.addChild(this.tableContainer);
		var fill = new PIXI.Graphics();
		fill.beginFill(0,0.2);
		fill.drawRect(200,244,805,400);
		fill.endFill();
		var fillAndrey = new PIXI.Graphics();
		fillAndrey.beginFill(0,0.2);
		fillAndrey.drawRect(200,174,805,470);
		fillAndrey.endFill();
		this.tb = new PIXI.Text("",styleContent,2);
		this.tb.position = new PIXI.Point(210,250);
		this.tba = new PIXI.Text("",styleContent,2);
		this.tba.position = new PIXI.Point(210,184);
		this.tableContainer.addChild(this.chname);
		this.tableContainer.addChild(this.portrait);
		this.tableContainer.addChild(this.social);
		this.tableContainer.addChild(this.character);
		this.tableContainer.addChild(this.opinion);
		this.tableContainer.addChild(this.petr);
		this.tableContainer.addChild(this.elen);
		this.tableContainer.addChild(this.andrey);
		this.tableContainer.addChild(this.natasha);
		this.tableContainer.addChild(this.sonya);
		this.tableContainer.addChild(this.anatoly);
		this.tableContainer.addChild(this.maria);
		this.tableContainer.addChild(this.nikolay);
		this.tableContainer.addChild(fill);
		this.tableContainer.addChild(this.tb);
		this.andreyContainer.addChild(this.skyau);
		this.andreyContainer.addChild(this.peace);
		this.andreyContainer.addChild(this.bogucharovo);
		this.andreyContainer.addChild(this.meeting);
		this.andreyContainer.addChild(this.love);
		this.andreyContainer.addChild(this.war);
		this.andreyContainer.addChild(this.redemption);
		this.andreyContainer.addChild(this.remission);
		this.andreyContainer.addChild(this.death);
		this.andreyContainer.addChild(fillAndrey);
		this.andreyContainer.addChild(this.tba);
	}
});
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; };
js.Browser.window = typeof window != "undefined" ? window : null;
js.Browser.document = typeof window != "undefined" ? window.document : null;
Main.main();
})();
