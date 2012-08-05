module.exports.contactRequest = contactRequest;

var nodemailer = require('nodemailer');
var smtpTransport = nodemailer.createTransport("Sendmail",{});

function contactRequest(request, response) {

	var name = request.body.name || request.query.name;
	var email = request.body.returnAddress || request.query.returnAddress;
	var subject = request.body.subject || request.query.subject;
	var message = request.body.message || request.query.message;
	
	var wasSubmitted = name && email && subject && message;
	
	if (wasSubmitted) {
		smtpTransport.sendMail({
		    from: name + "<" + email + ">",
		    to: "ben@bonta-kun.net",
		    subject: subject,
		    text: message
		}, function(error, response){
		    if (error)
		        console.log(error);
		    else
		        console.log("Message sent: " + response.message);
		});
	}
	
    response.render('contact', {
        locals: {
            node_server_url: 'http://ve.bonta-kun.net',
            title: "contact",
            wasSubmitted: wasSubmitted
        }
    });
}