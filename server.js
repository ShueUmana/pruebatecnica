var express = require('express');
var bodyParser=require('body-parser');
var morgan=require('morgan');
var config =require('./config');
var mongoose = require('mongoose');

mongoose.connect(config.database,function(err){
	if(err){
		console.log(err);
	}else{
		console.log('Conectado a la DB');
	}

});

//Esquema para el ingreso de condiciones.

var CondicionesSchema = {
	name: String,
	condition: String
}

var condiciones = mongoose.model('condiciones',CondicionesSchema);




var app=express();

app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/',function(req,res){
	res.sendFile(__dirname+'/public/views/index.html');
});

app.get('/condiciones',function(req,res){
	condiciones.find(function(error,condicion){
		res.send(condicion);
	})
});

app.listen(3000, function(err){
	if(err){
		console.log(err);
	}else{ 
		console.log('Escuchando en el puerto 3000')
	}
})