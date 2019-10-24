const DbConnection = require('../include/db_connect');
var data = "";
var numRows = "";
class QueryDb {

	constructor() {
		let DbConnectionObj = new DbConnection();
		this.con = DbConnectionObj.ConnectToDb();
	}

	// insert code here
	RunQuery(sql) {
		this.con.query(sql, function (err, data) {
			if (err)
				throw err;
			this.result = 1;
		});
		return this.result;
	}

	// return data with array
	SelectRecBySp(sql) {
		this.con.query(sql, function (err, res, fields) {
			if (err) {
				console.log(err);
			}
			data = res;
		});
		return data;
	}

	// return no of rows 
	numRows(sql) {
		this.con.query(sql, function (err, res, fields) {
			if (err) {
				console.log(err);
			} else {
				if (res.length > 0) {
					numRows = res.length;
				}

			}
		});
		return numRows;
	}
	
	
	 query( sql, args ) {
	        return new Promise( ( resolve, reject ) => {
	        	this.con.query( sql, args, ( err, rows ) => {
	                if ( err )
	                    return reject( err );
	                resolve( rows );
	            } );
	        } );
	    }
	    
	 close() {
	        return new Promise( ( resolve, reject ) => {
	            this.con.end( err => {
	                if ( err )
	                    return reject( err );
	                resolve();
	            } );
	        } );
	    }

	myDateTime() {
		return Date();
	};
}
module.exports = QueryDb;
