var canvas = document.getElementById("fd-canvas");
var context = canvas.getContext("2d");

//Иницилизация изображений
var bkgr = new Image();
bkgr.src = "images/wood.png";
var dostoevskiy = new Image();
dostoevskiy.src = "images/dostoevskiy.png";
var button = new Image();
button.src = "images/button.png";
var page = new Image();
page.src = "images/page.png";

var biograph, bibliograph, language, legacy, button_1, button_2, button_3, button_4;
var button_1_text, button_2_text, button_3_text, button_4_text;

var lublino = new Image();
lublino.src = "images/memory/lublino.jpg";
var darovoe = new Image();
darovoe.src = "images/memory/darovoe.jpg";
var drezden = new Image();
drezden.src = "images/memory/drezden.jpg";
var moscow = new Image();
moscow.src = "images/memory/moscow.jpg";
var spb = new Image();
spb.src = "images/memory/spb.jpg";

var time = new Date().getTime();
var opacity = -0.03;
var page;

// Для текста
var menu = { 
	pos: -1024,
	content: 'none',
	page: 1,
	isOpen: false
};

//Анимация
 function draw()
{	
	var now = new Date().getTime(),
        dt = now - (time || now);
 
    time = now;
	
	if (opacity < 1){
		opacity += (dt/2300);
		canvas.style.opacity = opacity;
		console.log(dt);
	}
	context.clearRect(0,0, canvas.width, canvas.height);
	Menu();
	drawInfo();
	requestAnimationFrame(draw);
}

// Перенос текста по строкам
function writeText(text, x, y, margin)
{
	var words = text.split('<br>');
	for (var n=0; n < words.length; n++){
		context.fillText(words[n], x, y+margin*n);
	}
}

window.onload = function()
{
	//Рисуем графику, включаем события
	//Menu();
	canvas.addEventListener('click', onClick, false);
	document.addEventListener('keyup', onKeyUp, false);
	canvas.style.opacity = 0;
	draw();
}

// Рисуем информацию
function drawInfo(){
	context.save();
	context.globalAlpha = 0.5;
	context.fillStyle = "#111111";
	context.fillRect(menu.pos+50, 200, 600, 400);
	context.restore();
	context.fillStyle = "#ffffff";
	context.font = "10pt 'Tahoma'";
	context.shadowOffsetX = 0; context.shadowOffsetY = 0; context.shadowBlur = 0;
	switch (menu.content){
	case 'bio':
	if (menu.page == 1){
		writeText('По линии отца Фёдор Михайлович происходил из дворянского рода Достоевских,<br>ведущего своё начало с 1506 года.<br>Дед писателя Ф. М. Достоевского Андрей Григорьевич Достоевский<br>служил униатским, позже — православным священником<br>в селе Войтовцы близ Немирова (ныне Винницкая область Украины).<br>Отец, Михаил Андреевич (1787—1839), учился в Московском отделении<br>Императорской медико-хирургической академии,<br>служил лекарем в Бородинском пехотном полку,<br>ординатором в Московском военном госпитале, лекарем в Мариинской больнице<br>Московского воспитательного дома<br>(в больнице для неимущих, известной под названием Божедомки).<br>Мать писателя, Мария Фёдоровна Нечаева (1800—1837),<br>была дочерью московского купца III гильдии<br>Фёдора Тимофеевича Нечаева (1769—1832),<br>происходившего из города Боровска Калужской губернии.<br><br><br>В 1827 году М. А. Достоевский за отличную службу и выслугу лет был произведён<br>в чин коллежского асессора, дававший право на потомственное дворянство.<br>Позже, в 1829 году, за ревностную службу был награждён орденом<br>Святого Владимира 4-й степени, а в 1832 году удостоен<br>чина надворного советника и ордена Святой Анны 2-й степени («Анна на шее»).<br><br>В 1831 году Михаил Андреевич приобрёл небольшое село Даровое в Каширском уезде<br>Тульской губернии, а в 1833 году и соседнюю деревню Черемошню (Чермашню),<br>где в 1839 году, по слухам, был убит собственными крепостными.<br><br>', menu.pos+70, 230, 12);
	}
	if (menu.page == 2){
		writeText('Когда Достоевскому было 16 лет, его мать умерла от чахотки,<br>и отец отправил старших сыновей, Фёдора и Михаила<br>(впоследствии также ставшего писателем), в пансион<br>К. Ф. Костомарова в Петербурге для подготовки к поступлению<br>в инженерное училище.<br>1837 год стал важной датой для Достоевского.<br>Это год смерти его матери, год смерти Пушкина,<br>творчеством которого он (как и его брат) зачитывался с детства,<br>год переезда в Петербург и поступления в Главное инженерное училище.<br><br>Михаил и Фёдор Достоевские желали заниматься литературой,<br>однако отец считал, что труд писателя не сможет обеспечить<br>будущее старших сыновей, и настоял на их поступлении в инженерное училище,<br>служба по окончании которого гарантировала материальное благополучие.<br>В «Дневнике писателя» Достоевский вспоминал, как по дороге в Петербург<br>с братом «мечтали мы только о поэзии и о поэтах»,<br>«а я беспрерывно в уме сочинял роман из венецианской жизни».<br><br>В 1839 году при загадочных обстоятельствах умирает отец Достоевского.<br><br>Учёба в училище тяготила юношу.<br>Он не испытывал никакого призвания к будущей службе.<br>Всё своё свободное от занятий время Достоевский уделял чтению,<br>а по ночам сочинял. Осенью 1838 года товарищи по учёбе в<br>Инженерном училище под влиянием Достоевского составили литературный кружок,<br>в который вошли И. И. Бережецкий, Д. В. Григорович, А. Н. Бекетов и Н. И. Витковский.<br>По окончании училища в 1843 году Достоевский был зачислен полевым<br>инженером-подпоручиком в Петербургскую инженерную команду,<br>но уже в начале лета следующего года, решив всецело посвятить себя литературе,<br>подал в отставку и 19 октября 1844 года получил увольнение от военной службы в чине<br>поручика.<br>', menu.pos+70, 230, 12);
	}
	if (menu.page == 3){
		writeText('Весной 1846 года А. Н. Плещеев познакомил Достоевского с почитателем Ш. Фурье<br>М. В. Петрашевским. Но Достоевский начал посещать устраиваемые Петрашевским<br>«пятницы» с конца января 1847 года, где главными обсуждаемыми вопросами были свобода<br>книгопечатания, перемена судопроизводства и освобождение крестьян. Среди петрашевцев<br>существовало несколько самостоятельных кружков. Достоевский посещал<br>литературно-музыкальный кружок С. Ф. Дурова, состоявший из участников «пятниц»,<br>которые разошлись с Петрашевским по политическим взглядам.<br>Осенью 1848 года Достоевский познакомился с называвшим себя коммунистом<br>Н. А. Спешневым, вокруг которого<br>вскоре сплотилось семеро наиболее радикальных петрашевцев,<br>составив особое тайное общество. Достоевский стал членом этого общества,<br>целью которого было создание<br>нелегальной типографии и осуществление переворота в России.<br>В кружке С. Ф. Дурова Достоевский несколько раз читал запрещённое<br>«Письмо Белинского Гоголю».<br>Вскоре после публикации «Белых ночей» ранним утром 23 апреля 1849 года писатель<br>в числе многих петрашевцев был арестован и провёл 8 месяцев в заключении<br>в Петропавловской крепости. Следствие по делу петрашевцев осталось в неведении<br>о существовании семёрки Спешнева. Об этом стало известно спустя много лет из<br>воспоминаний поэта А. Н. Майкова. На допросах Достоевский предоставлял следствию<br> минимум компрометирующей информации.<br><br>Хотя Достоевский отрицал предъявленные ему обвинения,<br>суд признал его «одним из важнейших преступников».<br><br>Суд и суровый приговор к смертной казни 22 декабря 1849 года на Семёновском<br>плацу был обставлен как инсценировка казни. В последний момент осуждённым<br>объявили о помиловании, назначив наказание в виде каторжных работ.<br>Один из приговорённых к казни, Николай Григорьев, сошёл с ума.<br>Ощущения, которые он мог испытывать перед казнью, Достоевский<br>передал словами князя Мышкина в одном из монологов в романе «Идиот».<br><br>', menu.pos+70, 230, 12);
	}
	if (menu.page == 4){
		writeText('Следующие четыре года Достоевский провёл на каторге в Омске<br>Кроме Достоевского ни один из русских писателей XIX века не прошёл<br>через суровую школу каторги. Арестанты были лишёны права переписки,<br>но, находясь в лазарете, писателю удавалось тайно вести записи<br>в так называемой «Сибирской тетради».<br>Впечатления от пребывания в остроге нашли потом отражение<br>в повести «Записки из Мёртвого дома».<br><br>', menu.pos+70, 230, 12);
	}
	break;
	case 'bibl':
		if (menu.page == 1){
			writeText('1846 — Бедные люди<br>1861 — Униженные и оскорблённые<br>1866 — Игрок<br>1866 — Преступление и наказание<br>1868—1869 — Идиот<br>1871—1872 — Бесы<br>1875 — Подросток<br>1879—1880 — Братья Карамазовы<br>', menu.pos+70, 230, 12);
		}
		if (menu.page == 2){
			writeText('1846 — Двойник<br>1846 — Как опасно предаваться честолюбивым снам<br>1846 — Господин Прохарчин<br>1847 — Роман в девяти письмах<br>1847 — Хозяйка<br>1848 — Ползунков<br>1848 — Слабое сердце<br>1848 — Честный вор<br>1848 — Ёлка и свадьба<br>1848 — Неточка Незванова<br>1848 — Белые ночи<br>1849 — Маленький герой<br>1859 — Дядюшкин сон<br>1859 — Село Степанчиково и его обитатели<br>1860 — Чужая жена и муж под кроватью<br>1860 — Записки из Мёртвого дома<br>1862 — Скверный анекдот<br>1864 — Записки из подполья<br>1865 — Крокодил<br>1870 — Вечный муж<br>1873 — Бобок<br>1876 — Мужик Марей<br>1876 — Кроткая<br>1876 — Мальчик у Христа на ёлке<br>1877 — Сон смешного человека<br>', menu.pos+70, 230, 12);
		}
		if (menu.page == 3){
			writeText('1847 — Петербургская летопись<br>1861 — Рассказы Н.В. Успенского<br>1862 — Зимние заметки о летних впечатлениях<br>1876 — Столетняя<br>1880 — Приговор<br>1880 — Пушкин<br>', menu.pos+70, 230, 12);
		}
		if (menu.page == 4){
			writeText('1873 — Дневник писателя. 1873 год.<br>1876 — Дневник писателя. 1876 год.<br>1877 — Дневник писателя. Январь-август 1877 года.<br>1877 — Дневник писателя. Сентябрь-декабрь 1877 года.<br>1880 — Дневник писателя. 1880 год.<br>1881 — Дневник писателя. 1881 год.<br>', menu.pos+70, 230, 12);
		}
	break;
	case 'lang':
		writeText('"Качественно новый тип словесно-эстетической гармонии создавался писателем<br>из пестрого хаоса уличного просторечия, канцелярских оборотов, газетного жаргона,<br>пародийной игры, всяческих речевых ошибок, ляпсусов и оговорок. По этой причине<br>своеобразие художественного языка Достоевского не было понято современниками,<br>даже теми, кто сочувственно относился к его творчеству." - Н. К. Михайловский<br><br>Литературный язык Достоевского состоит из частых повторов одних и тех же слов,<br>использования устной интонации, смещения речевых стилей, при чем, как в диалогах,<br>так и в авторской речи прослеживаются два последних качества.<br>Главным новаторством Достоевского была смысловая полифония: факты вступали друг <br>с другом в противоречие,<br>например: "Это был ведь чело век умиейший и даровитейший, человек,<br>так сказать, даже науки, впрочем, в науке ну, одним словом,<br>в науке он сделал не так много и, кажется, совсем ничего".', menu.pos+70, 230, 12);
	break;
	case 'legacy':
		if (menu.page == 1){
			writeText('Достоевистика — раздел литературоведения и истории литературы,<br>посвящённый творчеству и биографии<br> Фёдора Михайловича Достоевского. Исследователи жизни и творчества Достоевского<br>называются достоевистами. Среди известных достоевистов: академик Г. М. Фридлендер,<br>доктора филологических наук И. Л. Волгин, В. Н. Захаров (глава «петрозаводской школы»<br>в российской достоевистике), Т. А. Касаткина, Л. И. Сараскина, К. А. Степанян,<br>Г. К. Щенников.<br><br>', menu.pos+70, 230, 12);
		}
		if (menu.page == 2){
			writeText('1. Музей-квартира Ф. М. Достоевского<br>2. Литературно-мемориальный музей Ф. М. Достоевского в Санкт-Петербурге<br>3. Литературно-мемориальный музей Ф. М. Достоевского в Новокузнецке<br>					(Кемеровская область)<br>4. Литературно-мемориальный музей Ф. М. Достоевского в Семипалатинске<br>5. Дом-музей Ф. М. Достоевского<br>			(филиал Новгородского государственного объединённого музея-заповедника)<br>6. Музей-усадьба в селе Даровое', menu.pos+70, 230, 12);
		}
		if (menu.page == 3){
			//writeText('Съешь еще этих мягких<br>Булочек<br>Да<br>Выпей<br>Чаечку', menu.pos+70, 230, 12);
			context.drawImage(lublino, menu.pos+70, 230);
			context.drawImage(darovoe, menu.pos+170, 230);
			context.drawImage(drezden, menu.pos+270, 230);
			context.drawImage(moscow, menu.pos+370, 230);
			context.drawImage(spb, menu.pos+470, 230);
			writeText('Слева направо: памятники в Люблино, усадьбе Даровое, г. Дрезден, г. Москва, <br>г. Санкт-Петербург.', menu.pos+70, 530, 12);
		}
		if (menu.page == 4){
			writeText('', menu.pos+70, 230, 12);
		}
	break;
	}
}

//Оформление меню
function Menu()
{
	//Рисуем фон
	{var pat = context.createPattern(bkgr, "repeat");
	context.fillStyle = pat;
	context.fillRect(0, 0, canvas.width, canvas.height);}
	//Достоевский
	{context.save();
	context.translate(canvas.width, 0);
	context.scale(-1, 1);
	context.drawImage(dostoevskiy, 350, 150);
	context.restore();}
	//Фальшивая тень
	{var shadow = context.createRadialGradient(canvas.width/2, canvas.height/2, 50, canvas.width/2, canvas.height/2, 550);
	shadow.alpha = 0;
	shadow.addColorStop(1, '#000000');
	shadow.addColorStop(0, '#707070');
	context.fillStyle = shadow;
	context.save();
	context.globalAlpha = 0.4;
	context.fillRect(-5, -5, canvas.width+5, canvas.height+5);
	context.restore();}
	//Название
	{context.font = "italic 12pt 'Times New Roman'";
	context.fillStyle = "#f8f8f8";
	context.shadowColor = "black"; context.shadowOffsetX = 1; context.shadowOffsetY = 1; context.shadowBlur = 5;
	context.fillText('"Надо любить жизнь больше, чем смысл жизни"', canvas.width - canvas.width/2.9, canvas.height / 20);
	context.font = "italic 22pt 'Times New Roman'";
	context.fillText('Федор Михайлович Достоевский', canvas.width - canvas.width/2.4, canvas.height / 12);
	context.font = "italic 18pt 'Times New Roman'";
	context.fillText('Идеи и новаторство', canvas.width - canvas.width/4.4, canvas.height / 8.5);
	context.save();
	context.globalAlpha = 0.8;
	context.font = "10pt 'Tahoma'";
	context.fillText('Подготовил Антон Завьялов', canvas.width - canvas.width/5.5, canvas.height - 15);
	context.shadowOffsetX = 0;
	//Кнопки
	biograph = new Button("Биография", canvas.width - canvas.width/4.2, canvas.height - canvas.height/1.2, 75, 28);
	bibliograph = new Button("Библиография", canvas.width - canvas.width/4.2, canvas.height - canvas.height/1.33, 65, 28);
	language = new Button("Язык Достоевского", canvas.width - canvas.width/4.2, canvas.height - canvas.height/1.49, 55, 28);
	legacy = new Button("Наследие", canvas.width - canvas.width/4.2, canvas.height - canvas.height/1.69, 78, 28);
	button_1 = new MenuButton(button_1_text, menu.pos+50, 610, 15, 20);
	button_2 = new MenuButton(button_2_text, menu.pos+190, 610, 15, 20);
	button_3 = new MenuButton(button_3_text, menu.pos+410, 610, 5, 20);
	button_4 = new MenuButton(button_4_text, menu.pos+550, 610, 2, 20);
	context.restore();}
}

//Класс кнопки
function Button(caption, x, y, ox, oy)
{
	this.x = x; this.y = y; this.width = 230; this.height = 50;
	context.drawImage(button, x, y, this.width, this.height);
	context.font = "12pt 'Times New Roman'";
	context.fillText(caption, x + ox, y + oy);
}

// Класс кнопки для справок
function MenuButton(caption, x, y, ox, oy)
{
	this.x = x; this.y = y; this.width = 100; this.height = 40;
	context.save();
	context.globalAlpha = 0.5;
	context.fillStyle = "#111111";
	context.fillRect(this.x, this.y, this.width, this.height);
	context.restore();
	context.font = "12pt 'Times New Roman'";
	context.fillText(caption, x + ox, y + oy);
}

//Евент-листенер кликанья мышкой
function onClick(e)
{
	var rect = canvas.getBoundingClientRect();
	var x = e.clientX ;
	var y = e.clientY - rect.top;
	console.log(x + ' ' + y);
	/*if ((x > biograph.x && x < biograph.x + biograph.width) && (y > biograph.y && y < biograph.y + biograph.height )){
		//context.clearRect(0,0, canvas.width, canvas.height);
		menu.pos = 0;
	}*/
	if (getRect(x, y, biograph.x, biograph.y, biograph.width, biograph.height )){
		menu.pos = 0; menu.content = 'bio'; menu.page = 1; menu.isOpen = true;
		button_1_text = "Родители"; button_2_text = "Юность"; button_3_text = "Петрашевцы";  button_4_text = "Дальн. судьба";
	}
	if (getRect(x, y, bibliograph.x, bibliograph.y, bibliograph.width, bibliograph.height )){
		menu.pos = 0; menu.content = 'bibl'; menu.page = 1; menu.isOpen = true;
		button_1_text = "Романы"; button_2_text = "Повести"; button_3_text = "Очерки"; button_4_text = "Дневники";
	}
	if (getRect(x, y, language.x, language.y, language.width, language.height )){
		menu.pos = 0; menu.content = 'lang'; menu.page = 1; menu.isOpen = true;
		button_1_text = ""; button_2_text = ""; button_3_text = ""; button_4_text = "";
	}
	if (getRect(x, y, legacy.x, legacy.y, legacy.width, legacy.height*2)){
		menu.pos = 0; menu.content = 'legacy'; menu.page = 1; menu.isOpen = true;
		button_1_text = "Дост-ика"; button_2_text = "Музеи"; button_3_text = "Памятники"; button_4_text = "Прочее";
	}
}

function onKeyUp(e)
{
	//console.log(e.keyCode);
	switch (e.keyCode){
		case 49:
			menu.page = 1;
		break;
		case 50:
			menu.page = 2;
		break;	
		case 51:
			menu.page = 3;
		break;			
		case 52:
			menu.page = 4;
		break;
	}
}

//Альтернатива CheckCollision

function getRect(x, y, ox, oy, w1, h1){
	if ((x > ox && x < ox + w1) && (y > oy && y < oy + h1)) {
		return true;
	}
}