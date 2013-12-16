var email = require("emailjs");
var config = require("../config");
var server = email.server.connect(config.smtp);

module.exports = {
	send: function(emailAddress, subject, body) {
		server.send({
			text: body,
			from: config.smtp.user,
			to: emailAddress,
			subject: subject
		}, function(err, message) {
			console.log(err || message);
		});
	}
}