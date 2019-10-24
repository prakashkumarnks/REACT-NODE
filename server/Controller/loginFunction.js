//const Model = require('./Model/QueryDb');
var sess; // global session, NOT recommended
exports.login = function(req, res) {

	var txt = req.body.txtusername;
	var sess = req.session;
	sess.txtusername = txt;
	res.send(sess.txtusername)

};

exports.SessionNotSet = function(req, res, next) {
	sess = req.session;
	if (!sess.txtusername) {
		res.redirect('/login');
	}
	next();
}