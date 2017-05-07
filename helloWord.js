var express=require('express');
var app=express();
app.set('port',process.env.PORT||3000);
var handlebars=require('express-handlebars').create({defaultLayaut:'main'});
var fortunes = ["Победи свои страхи, или они победят тебя.","Рекам нужны истоки.",
    "Не бойся неведомого.","Тебя ждет приятный сюрприз.","Будь проще везде, где только можно." ]
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
	app.get('/',function(req, res){
		res.render('home');
	});
	app.get('/about', function(req, res){  
	  var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]; 
	     res.render('about', { fortune: randomFortune }); });
	app.use('404',function(req, res,next){
		res.status(404)
		res.render('404');
	});
	app.get('500',function(err,req, res,next){
		console.log(err.stack);
		res.status(500);
		res.render('500');
	});

app.listen(app.get('port'),function(){
	console.log('express was run on http://localhost:'+app.get('port'));
});


/*var express=require('express')
var app=express();
app.set('port',process.env.PORT||3000);

app.get('/', function(req,res){
	res.type('text/plain');
	res.send('home page');
});

app.get('/about', function(req,res){
	res.type('text/plain');
	res.send('about');
})

app.use(function(req,res,next){
	res.type('text/plain');
	res.status(404);
	res.send('404-not found');
});

app.use(function(err,req,res,next){
	console.error(err.stack);
	res.type('text/plain');
	res.status(500);
	res.send('500-fail server');
});

app.listen(app.get('port'),function(){
	console.log('express was run on http://localhost:'+app.get('port'));
});*/