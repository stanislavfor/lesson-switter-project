//console.log('Hello!');
$(document).ready(function(){

	var getDate = function(){
		var d = new Date(),
			day = d.getDate(),
			month = d.getMonth(),
			year = d.getFullYear(),
			hrs = d.getHours(),
			min = d.getMinutes(),
			sec = d.getSeconds();
		var monthArray = new Array("января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября","ноября", "декабря");
		if (day <= 9) day = "0" + day;
		if (hrs <= 9) hrs = "0" + hrs;
		if (min <= 9) min = "0" + min;
		if (sec <= 9) sec = "0" + sec;
		//var actualDate = day + ' ' + monthArray[month] + ' ' + year + ' года, время ' + hrs + ':' + min + ':' + sec + '';
		var actualDate = `${day} ${monthArray[month]} ${year} года, время ${hrs}:${min}:${sec}`;
		//console.log(actualDate);
		//console.log(day);
		//console.log(hrs);
		//console.log(min);
		//console.log(sec);
		//console.log(mnth);
		//console.log(year);
		return actualDate;
	};
	//console.log(getDate());

	var countTweets = function(){
		var tweetCounter = $('.tweet-card').length;
		//console.log(tweetCounter);
		$('#tweetCounter').text(tweetCounter);
	}
	
	//https://gist.github.com/ryansmith94/0fb9f6042c1e0af0d74f
	var wrapURLs = function (text, new_window) {
	  var url_pattern = /(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}\-\x{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?/ig;
	  var target = (new_window === true || new_window == null) ? '_blank' : '';
	  
	  return text.replace(url_pattern, function (url) {
	    var protocol_pattern = /^(?:(?:https?|ftp):\/\/)/i;
	    var href = protocol_pattern.test(url) ? url : 'http://' + url;
	    return '<a href="' + href + '" target="' + target + '">' + url + '</a>';
	  });
	};
	

	var createTweet = function(date, text){
		var $tweetBox = $('<div class="card tweet-card">'); // Создаем обертку для твита
		var $tweetDate = $('<div class="tweet-date">').text( date ); // Создаем дату
		//var $tweetText = $('<div class="tweet-text">').text( text ).wrapInner('<p></p>'); // Создаем контент с твитом и Оборачиваем в див с классом p;
		var $tweetText = $('<div class="tweet-text">').html( wrapURLs(text) ).wrapInner('<p></p>');
		var additionalClassName = '';
		if(text.length < 100) {
			additionalClassName = 'font-size-large';
		} else if(text.length > 150) {
			additionalClassName = 'font-size-small';
		} else {
			additionalClassName = 'font-size-normal';
		}
		$tweetText.addClass(additionalClassName);
		$tweetBox.append($tweetDate).append($tweetText); // Получаем разметку твита с датой и текстом;
		$('#tweetsList').prepend($tweetBox);
		countTweets();
	};


	var tweetsBase = [
		{
			date: '10 июня 2018 года, время 12:00:30',
			text: 'В хорошем дизайне добавление чего-то стоит дешевле, чем сама эта вещь. (Томас Гейл, автомобильный дизайнер)',
		}, 
		{
			date: '07 июня 2018 года, время 18:44:02',
			text: 'Думаю, искусство программировать немногим сложнее других человеческих навыков. Программирование делает вас лучше точно так же, как вам помогают развиваться изучение иностранного языка, математики или чтение книг. (Джек Дорси, считается создателем твиттера)',
		}, 
		{
			date: '20 апреля 2018 года, время 21:35:50',
			text: 'Over API http://overapi.com/ - интернет ресурс для веб-разработчики. Это шпаргалка для разработчика, сайт, на котором можно найти подсказку на любой вопрос по созданию сайтов и приложений. Сайт содержит примеры кода на любых языках программирования и прочих сервисов и инструментов, и может быть применён для помощи в разработки и вёрстки.', 
		}, 
		{
			date: '11 марта 2018 года, время 00:37:00',
			text: 'Некоторые проблемы лучше не решать, а избегать. (Чарльз Энтони Ричард Хоар, британский учёный)'
		}
	];

	tweetsBase.forEach( function(tweet){
		//console.log(tweet.date);
		//console.log(tweet.text);
		createTweet(tweet.date, tweet.text);
	});
	


	// Форма отправки твита = Привет мир!
	$('#postNewTweet').on('submit', function(e){
		e.preventDefault(); // Отменяем отправку формы
		var tweetText = $('#tweetText').val(); // Получаем текст твита = Привет мир!
		//console.log(tweetText);
		createTweet(getDate(), tweetText);
		//console.log($tweetBox[0]);
		//$tweetBox.text(tweetText);
		//console.log('Form submit!!');
		$('#tweetText').val('');
	});

});