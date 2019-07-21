// localhost:3000/auth/localuser/<Route>
const Router = require('express').Router(),
	User = require('../model/user.model'),
	bcrypt  = require('bcryptjs'),
	salt    = bcrypt.genSaltSync(10);


Router.post('/new',(req,res)=> {
	let newuser = new User;
	newuser.username = req.body.username;
	newuser.password = bcrypt.hashSync(req.body.password, salt);
	newuser.save((err,newuser) => {
		if(newuser) {
			req.session.localUser = newuser;
			res.redirect('/homepage');
		}
	})
})

Router.post('/login',(req,res)=>{
	User.find({
		username: req.body.username
	},(err,theuser) => {
		if(bcrypt.compareSync(req.body.password,theuser[0].password)){
			req.session.localUser = theuser;
		    res.redirect('/homepage');
		}else{
			res.redirect('/');
		}
	})
})
module.exports = Router;


		// if(theuser){
		// 	req.session.localUser = theuser;
		// 	res.redirect('/homepage');
		// }



