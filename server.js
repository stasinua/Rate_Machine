//setting up app

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    path = require('path'),
    morgan = require('morgan'),
    port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(res,req,next){
  //В книге записан старый метод setHeaders, он не работает с Express 4.х
  res.header('Acess-Control-Allow-Origin', '*');
  res.header('Acess-Control-Allow-Methods', 'GET, POST');
  res.header('Acess-Control-Allow-Headers', 'X-Requested-With,content-type, Autorization');
  next();
});

app.use(morgan('dev'));

//Files for frontend
app.use(express.static(__dirname + '/public'));

//Catchall route to send users to frontend
app.get('*', function(req,res){
  res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

//End of our app
app.listen(port);
console.log("MEAN_App on localhost: " + port);
