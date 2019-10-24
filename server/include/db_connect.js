var mysql = require('mysql');
class DbConnection {

	ConnectToDb() {
		var con = mysql.createConnection({
			host: 'localhost',
			user: 'prakash',
			password: 'prakash143',
			database: 'rigsindia',
			port: 3308,
			multipleStatements: true
		});

		con.connect(function (err) {
			if (err) throw err;
			//  console.log("Connected!");
		});
		return con;
	}

}
module.exports = DbConnection;