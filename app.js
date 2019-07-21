const express = require('express'),
	app = express(),
	mongoose = require('mongoose'),
	session  = require('express-session'),
	bodyParser = require('body-parser'),
	localUserRoutes = require('./controller/localuser.routes'),
	key = require('./key');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(session({ secret: key.secret }));



mongoose.connect('mongodb://mongoadmin:mongoadmin@localhost/advancedproject6?authSource=admin');

app.get('/',(req,res)=>{
	res.sendFile(__dirname + '/views/index.html');
})

app.use('/auth/localuser/',localUserRoutes); //localhost:3000/auth/localuser/<Route>


app.get('/homepage',(req,res)=>{
	// req.session.localUser 
	 if(req.session.localUser){
		res.send(req.session.localUser);
	}else{
		res.redirect('/');
	}
})



app.listen(3001,()=>{
	console.log('listening on http://localhost:3001/');
})