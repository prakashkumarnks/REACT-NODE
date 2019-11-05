const db = require('./include/db_connect');

//var con = db.ConnectToDb();
var result = [];
var data = [];
var numRows = 0;

let DbConnectionObj = new db();
var con = DbConnectionObj.ConnectToDb();

exports.RunQuery = function(sql) {
	con.query(sql, function(err, data) {
		if (err)
			throw err;
		 res = 1;
		setValue(res);
	});
	return result;
}
/*
exports.SelectRecBySp = function(sql) {
	con.query(sql, function(err, res, fields) {
		// setValue(res);
		if (err) {
			next(err) // Pass errors to Express.
		} else {
			setValue(res);
		}
	});
	return result;
}
*/


exports.SelectRecBySp = function(sql) {
	
	con.query(sql, function(err, result, fields) {
		if (err) {
			console.log(err);
		} else {
			 data = result;
			//res.send(result);
			// res.render(data);
		}
	});
	return data;
}

exports.numRows = function(sql) {
	con.query(sql, function(err, res, fields) {
		if (err) {
			next(err) // Pass errors to Express.
		} else {
			if (res.length > 0) {
  						numRows = res.length;
					}
			
		}
	});
	return numRows;
}


function setValue(value) {
	return result = value;
}

exports.myDateTime = function() {
	return Date();
};