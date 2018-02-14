var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var nodemailer = require('nodemailer');
var dotenv = require('dotenv');

dotenv.config();

var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.NODEMAILER_USER,
			pass: process.env.NODEMAILER_PASS
		}
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

app.get('/redirect', function (req, res) {
	res.sendFile(__dirname + '/public/redirect.html');
});

app.post('/', function(req, res) {

	var mailOptions = {
		from: 'PortfolioNodemailer <nodemailerportfolio@gmail.com>',
		to: 'darkwave99@gmail.com', 
		subject: req.body.subject, 
		text: req.body.message, 
		html: '<p>My email: <b>' + req.body.email + '</b></p><p>' + req.body.message + '</p>'
	};

	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent:' + info.response);
		}
	});

	res.redirect('/redirect');
})

app.listen(process.env.PORT || 5000, function(err) {
	if (err) {
		console.log(err);
	} else {
		console.log("Listening on port on 5000");
	}
});