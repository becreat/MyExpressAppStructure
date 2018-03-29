var fs      = require('fs');
var path    = require('path');
var express = require('express');
var router  = express.Router();
var app     = express();



/**
 * Configarations
 */

app.set('view engine','ejs');
app.set('views',path.join(__dirname + '/app/views'));



/**
 * Middleware
 */

app.use(express.static(path.join(__dirname,'/public')));
app.use(router);


/**
 * Setting Controllers
 */





//Initialize Controllers From  Controllers Directory 

fs.readdir('./app/controllers',(err,files)=>{
	files.forEach(file=>{
		let routername = '/'+file.replace('.js','');
		let controller = require('./app/controllers/'+routername);
 		(typeof(controller) == 'function') && router.use(routername,controller(express.Router(),fs.existsSync('./app/models/'+file) && require('./app/models/'+file)));
	})
})



//Index handler

router.get('/',(req,res)=>{
	res.render('index');
})

//Handle 404 Request 

app.use((req, res)=>{
	res.status(404);
	res.render('404');
})








/**
 * Starting Server
 */

app.listen(8080,()=>{
	console.log('Server is started at localhost:8080')
})