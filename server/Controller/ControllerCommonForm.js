const Model 		= require('../Model/QueryDb');

//var PagEnd = 10;

exports.listmember = function(req, res)
{
	/*var PagStart = req.query.num * 10 ;
	
	if(PagStart)
		var PagStart = PagStart;
		else
		var 	PagStart = 0;	
	////console.log(PagStart);	
	
	var Sql  = "SELECT * FROM trans_memberregistration";
	var Sql = Sql + ' limit ' + PagStart+ ',' + PagEnd;
	console.log(Sql);
	var data  = Model.SelectRecBySp(Sql);
	return data;*/
	const Pagination = require('./pagination');
	currentPage = 1;
	///var response = new Array();
	//row = 0;
	//var PagStart = req.query.num * 10 ;

	 var PagStart = req.query.num  ;
	
	 ///var PagStart = PagStart - 1;
	/*if(PagStart)
		var PagStart = PagStart * 10;
		else
		var 	PagStart = 0;	*/

	//var PagStart = (PagStart - 1 ) * 10 ;
		//if(PagStart < 0)
			//var 	PagStart = 0;
		
		
		if(PagStart)
			var PagStart = (PagStart - 1 ) * 10;
		else
			var 	PagStart = 0;	


	page_id = parseInt(req.query.num),
				currentPage = page_id > 0 ? page_id : currentPage,
				

		///start =  page_id * 10;

	  pageUri = '/view';
 		const perPage = 10,

	Query  = "SELECT * FROM trans_memberregistration";
	numRows 	 = Model.numRows(Query);
	const Paginate = new Pagination(numRows,currentPage,pageUri,perPage);
	var Sql = Query  + ' limit ' + PagStart+ ',10';
	//var Sql = Query  + ' LIMIT '+Paginate.perPage+' OFFSET '+Paginate.start;
	var data 	 = Model.SelectRecBySp(Sql);
		console.log(Sql);
	return  { 
		data: data, 
		numRows: numRows,
		pages : Paginate.links()
    }; 
	
};