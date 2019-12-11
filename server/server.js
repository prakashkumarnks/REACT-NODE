var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var multer = require('multer');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var app = express();


app.use(bodyParser.json());

app.use(express.static('public'));

const Model = require('./Model/QueryDb');
let Db = new Model();




app.use(function (req, res, next) {
	/*
	  * var err = new Error('Not Found'); err.status = 404; next(err);
	  */

	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');

	// res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,
	// Content-Type, Accept");

	// Pass to next layer of middleware
	next();
});

/*
upload.fields([{
           name: 'video', maxCount: 1
         }, {
           name: 'subtitles', maxCount: 1
         }])
         
         
         upload.fields([{ name: 'video', maxCount: 1}, {name: 'subtitles', maxCount: 1}])
 */

var common = require('./Common/common');


var storage = multer.diskStorage({
	  destination: function (req, file, cb) {
	    cb(null, 'E:/reactlogin/server/uploadmultiple/')
	  },
	  filename: function (req, file, cb) {
	    cb(null, file.fieldname + '-' + Date.now())
	  }
	})
	
var upload = multer({ storage: storage  })
 //console.log(upload);
//var upload = multer({ dest: 'E:/reactlogin/server/uploadmultiple/' });
//console.log(upload);


//let upload = multer({ storage: storage,dest: 'E:/reactlogin/server/uploads/' });

//app.post('/imageuppppp', upload.single('userPhoto'), (req, res, next) => {   // correct
//app.post('/imageuppppp', upload.single('userPhoto'),upload.single('filetoupload'), (req, res, next) => {
app.post('/imageuppppp', upload.fields([{ name: 'userPhoto', maxCount: 2,pam: 'one'}, {name: 'filetoupload', maxCount: 2 ,pam: 'two'}]), (req, res, next) => {  // correct
  const file = req.file;
  
  console.log(req.body.a);
  
 /* if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }*/
    res.send(file)
  
})

app.post('/s', upload.none(), function (req, res, next) {
//app.post('/s', function (req, res) {
//app.post('/s',  (req, res, next) => {  // correct
  
	///var upload = multer({ dest: 'E:/reactlogin/server/uploadmultiple/' });
	///var p = upload.fields([{ name: 'userPhoto', maxCount: 2 }]);

	  console.log(req.body.a);

	  res.end(req.body.a);
	  
	/*p(req, res, function (err) {

		///console.log(req.files);
		if (err) {
			return res.end("Error uploading file.");
		}
		res.end("File is uploaded");
	});*/
	
	
	/*	var sec = multer({ dest: 'E:/reactlogin/server/uploads/' });
	var secll = sec.fields([{ name: 'filetoupload', maxCount: 2 }]);
	
	secll(req, res, function (err) {

		console.log(req.files);
		
	})*/
})
/*
app.post('/imageuppppp', function (req, res) {
	
	var commonobj = new common();
	
	var s = commonobj.storage('userPhoto', 1, '/uploads/', req, res);
	s(req, res, function (err) {

		console.log(req.files);
		if (err) {
			return res.end("Error uploading file.");
		}
		res.end("File is uploaded");
	});
	res.end("File is uploaded");
});
*/



app.post('/uploadmultiple', function (req, res) {
	// var upload = multer({ storage : storage }).array('userPhoto',2);

	// var commonnew = new common();
	// const userPhoto = common.storage('userPhoto', 2, '/imageupload/', req,
	// res);
	// const uploadmultiple = common.storage('uploadmultiple', 3,
	// '/uploadmultiple/', req, res);
	var upload = multer({ dest: 'E:/reactlogin/server/uploadmultiple/' })
	// var p = multer({ storage: userPhoto }).array('userPhoto', 2);
	// var m = multer({ storage: uploadmultiple }).array('uploadmultiple', 3);
	// console.log(imagename);
	var p = upload.fields([{ name: 'userPhoto', maxCount: 2 }, { name: 'filetoupload', maxCount: 3 }])

	// console.log(p);

	p(req, res, function (err) {

		console.log(req.files);
		if (err) {
			return res.end("Error uploading file.");
		}
		res.end("File is uploaded");
	});

   /*
	 * m(req, res, function (err) {
	 * 
	 * console.log(req.files); if (err) { return res.end("Error uploading
	 * file."); } res.end("File is uploaded"); });
	 */



});




app.post('/chech', function (req, res) {
	var commonobj = new common();
	var s = commonobj.InsertDateFormat("9.9.2017");
	var v = commonobj.DispDateFormat("2017.9.9");
	res.send({ InsertDateFormat: s, DispDateFormat: v });
});


app.post('/data', function (req, res) {

	// var commonnew = new common();
	let trans_Andriodhomepageimage = Db.SelectRecBySp("SELECT * FROM bind_activestatus");
	var bind_gender = Db.SelectRecBySp('SELECT * FROM bind_gender');
	var time = Db.myDateTime();
	var timesec = Db.myDateTime();

	res.send({ artist: time, music: trans_Andriodhomepageimage, bind_gender: bind_gender, timesec: timesec });
	// Db.RunQuery("insert into test(b,c) values(1,2)");
	// Db.RunQuery("insert into test(b,c) values(1,2)");
});

app.post('/bindmaster_state', function (req, res) {

	// var commonnew = new common();
	///let bindmaster_state = Db.SelectRecBySp("");
	var sql = "SELECT state_id as value,state_Name as label FROM bindmaster_state";
	Db.query(sql).then(rows => {
		res.send({ bindmaster_state : rows});
	});
});


app.post('/statevsdistict', function (req, res, next) {
	var sql = "SELECT district_id as value, district_Name as label FROM bindmaster_district where  IsActive = 1 ";
	let state = req.body.state;

	if (state)
		sql += ' and  state_id = ' + state + ' ';

	Db.query(sql).then(rows => {
		Db.query('SELECT * FROM bind_activestatus').then(rowssec => {
			res.send({ ss: state, message: rows });
		});

	});
});

app.post('/myform', upload.fields([{ name: 'filesss', maxCount: 1 ,  p : 1  } ]),  (req, res, next) => {  // correct
///app.post('/myform', function (req, res, next) {
	
//	res.send("File is uploaded");
	var a = req.body.a;
	var b = req.body.b;
	var RfId = req.body.RfId;
	
	console.log(req.files);
	
	if(!a)
	{
		res.send({ id : 'a',ErrorMessage : "Please enter a"});
		return false;
	}
	
	if(!b)
	{
		res.send({ id : 'b',ErrorMessage : "Please enter b"});
		return false;
	}
	
	
	if(RfId)
		{
			 Db.RunQuery('update test set b = "'+a+'" , c = "'+b+'"  where a = '+RfId+' ').then(rowssec => {
				 res.send({success : "success" , message:"updated ", rowssec : rowssec });
			});
		}
		
	else
		{
			 Db.RunQuery('insert into test(b,c) values("'+a+'","'+b+'")').then(rowssec => {
				  res.send({success : "success" , message:"inserted ", rowssec : rowssec });
			 });
		}
})








app.post('/editupdate', function (req, res, next) {
	
	let start = req.body.start;
	let RfId = req.body.RfId;

	var sql = "SELECT * FROM test";
	if (RfId)
		sql += ' where  a = ' + RfId + ' ';

	if (!RfId)
		sql += ' limit ' + start * 10 + ',10 ';
		
//	console.log(sql);
	Db.query(sql).then(rowssec => {
		Db.numRows("SELECT *  FROM test").then(totalCount => {
			res.send({data : rowssec , totalCount : totalCount});
		
		});	
	});

});



app.get('/', function (req, res) {
	res.send('Hello Worldaaa');
})


app.post('/Fillddl', function (req, res) {

var Query = req.body.Query;
	singleclick.SelectRecBySp(Query).then(data =>{
			res.send(data);

	});
})




const PORT = process.env.PORT || 8083;
app.listen(PORT, () => console.log(`listening on ${PORT}`))